import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { AuthRequest, authenticate } from '../middleware/auth';

const router = Router();

// GET all devices
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const devices = await db.all<any>(
      `SELECT d.*,
        fm.name as farm_name,
        fl.name as field_name,
        (
          SELECT ROUND(sr.vwc_percent, 1)
          FROM sensor_readings sr
          WHERE sr.device_id = d.id
          ORDER BY sr.measured_at DESC, sr.depth_cm ASC
          LIMIT 1
        ) as latest_vwc,
        (
          SELECT MAX(sr.measured_at)
          FROM sensor_readings sr
          WHERE sr.device_id = d.id
        ) as latest_reading_time
       FROM devices d
       LEFT JOIN farms fm ON d.farm_id = fm.id
       LEFT JOIN fields fl ON d.field_id = fl.id
       ORDER BY d.created_at DESC`
    );

    const normalizedDevices = devices.map((d: any) => ({
      ...d,
      latest_vwc: d.latest_vwc !== null && d.latest_vwc !== undefined ? Number(d.latest_vwc) : null,
      battery_level: Number(d.battery_level || 100),
      signal_quality: Number(d.signal_quality || -70),
    }));

    return res.json({ devices: normalizedDevices });
  } catch (error: any) {
    console.error('Error fetching devices:', error);
    return res.status(500).json({ error: 'Failed to retrieve devices.' });
  }
});

// GET single device details
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const device = await db.get<any>(
      `SELECT d.*, fm.name as farm_name, fl.name as field_name
       FROM devices d
       LEFT JOIN farms fm ON d.farm_id = fm.id
       LEFT JOIN fields fl ON d.field_id = fl.id
       WHERE d.id = ? OR d.device_uid = ?`,
      [req.params.id, req.params.id]
    );

    if (!device) {
      return res.status(404).json({ error: 'Device not found.' });
    }

    // Recent readings across depths
    const recentReadings = await db.all<any>(
      `SELECT depth_cm, vwc_percent, temp_c, ec_ds_m, quality_score, measured_at, source
       FROM sensor_readings
       WHERE device_id = ?
       ORDER BY measured_at DESC, depth_cm ASC
       LIMIT 50`,
      [device.id]
    );

    // Maintenance records
    const maintenance = await db.all<any>(
      'SELECT * FROM maintenance_records WHERE device_id = ? ORDER BY performed_at DESC',
      [device.id]
    );

    return res.json({ device, recentReadings, maintenance });
  } catch (error: any) {
    console.error('Error fetching device details:', error);
    return res.status(500).json({ error: 'Failed to retrieve device details.' });
  }
});

// REGISTER new device
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { deviceUid, name, model, hardwareType, farmId, fieldId, firmwareVersion } = req.body;
    if (!deviceUid || !name) {
      return res.status(400).json({ error: 'Device UID and name are required.' });
    }

    const existing = await db.get('SELECT id FROM devices WHERE device_uid = ?', [deviceUid.trim()]);
    if (existing) {
      return res.status(409).json({ error: 'A device with this UID is already registered.' });
    }

    const deviceId = uuidv4();
    await db.run(
      `INSERT INTO devices (id, farm_id, field_id, device_uid, name, model, hardware_type, firmware_version, battery_level, signal_quality, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 100, -65, 'ONLINE')`,
      [
        deviceId,
        farmId || null,
        fieldId || null,
        deviceUid.trim().toUpperCase(),
        name.trim(),
        model || 'Probe-X5',
        hardwareType || 'SDI-12 Multi-Depth',
        firmwareVersion || 'v2.4.1',
      ]
    );

    const created = await db.get('SELECT * FROM devices WHERE id = ?', [deviceId]);
    return res.status(201).json({ device: created });
  } catch (error: any) {
    console.error('Error registering device:', error);
    return res.status(500).json({ error: 'Failed to register device.' });
  }
});

// UPDATE device
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, farmId, fieldId, status, model, firmwareVersion, batteryLevel, signalQuality } = req.body;

    const device = await db.get('SELECT id FROM devices WHERE id = ?', [req.params.id]);
    if (!device) {
      return res.status(404).json({ error: 'Device not found.' });
    }

    await db.run(
      `UPDATE devices
       SET name = COALESCE(?, name),
           farm_id = COALESCE(?, farm_id),
           field_id = COALESCE(?, field_id),
           status = COALESCE(?, status),
           model = COALESCE(?, model),
           firmware_version = COALESCE(?, firmware_version),
           battery_level = COALESCE(?, battery_level),
           signal_quality = COALESCE(?, signal_quality)
       WHERE id = ?`,
      [
        name ? name.trim() : null,
        farmId !== undefined ? farmId : null,
        fieldId !== undefined ? fieldId : null,
        status || null,
        model || null,
        firmwareVersion || null,
        batteryLevel !== undefined ? parseInt(batteryLevel, 10) : null,
        signalQuality !== undefined ? parseInt(signalQuality, 10) : null,
        req.params.id,
      ]
    );

    const updated = await db.get('SELECT * FROM devices WHERE id = ?', [req.params.id]);
    return res.json({ device: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update device.' });
  }
});

// ADD maintenance or calibration record
router.post('/:id/maintenance', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { type, description, performedBy, notes } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Maintenance description is required.' });
    }

    const device = await db.get('SELECT id FROM devices WHERE id = ?', [req.params.id]);
    if (!device) {
      return res.status(404).json({ error: 'Device not found.' });
    }

    const recordId = uuidv4();
    await db.run(
      `INSERT INTO maintenance_records (id, device_id, type, description, performed_by, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        recordId,
        req.params.id,
        type || 'CALIBRATION',
        description.trim(),
        performedBy || req.user!.fullName,
        notes || null,
      ]
    );

    const record = await db.get('SELECT * FROM maintenance_records WHERE id = ?', [recordId]);
    return res.status(201).json({ record });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to log maintenance record.' });
  }
});

// DELETE device
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const device = await db.get('SELECT id FROM devices WHERE id = ?', [req.params.id]);
    if (!device) {
      return res.status(404).json({ error: 'Device not found.' });
    }

    await db.run('DELETE FROM devices WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Device retired/deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to delete device.' });
  }
});

export default router;
