import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';
import { db } from '../db';

export class DeviceService {
  async getAllDevices() {
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

    return devices.map((d: any) => ({
      ...d,
      latest_vwc: d.latest_vwc !== null && d.latest_vwc !== undefined ? Number(d.latest_vwc) : null,
      battery_level: Number(d.battery_level || 100),
      signal_quality: Number(d.signal_quality || -70),
    }));
  }

  async getDeviceById(idOrUid: string) {
    const device = await db.get<any>(
      `SELECT d.*, fm.name as farm_name, fl.name as field_name
       FROM devices d
       LEFT JOIN farms fm ON d.farm_id = fm.id
       LEFT JOIN fields fl ON d.field_id = fl.id
       WHERE d.id = ? OR d.device_uid = ?`,
      [idOrUid, idOrUid]
    );

    if (!device) {
      const err: any = new Error('Device not found.');
      err.statusCode = 404;
      throw err;
    }

    const recentReadings = await db.all<any>(
      `SELECT depth_cm, vwc_percent, temp_c, ec_ds_m, quality_score, measured_at, source
       FROM sensor_readings
       WHERE device_id = ?
       ORDER BY measured_at DESC, depth_cm ASC
       LIMIT 50`,
      [device.id]
    );

    const maintenance = await db.all<any>(
      'SELECT * FROM maintenance_records WHERE device_id = ? ORDER BY performed_at DESC',
      [device.id]
    );

    return { device, recentReadings, maintenance };
  }

  async registerDevice(data: any) {
    const { deviceUid, name, model, hardwareType, farmId, fieldId, firmwareVersion } = data;
    if (!deviceUid || !name) {
      const err: any = new Error('Device UID and name are required.');
      err.statusCode = 400;
      throw err;
    }

    const existing = await db.get('SELECT id FROM devices WHERE device_uid = ?', [deviceUid.trim()]);
    if (existing) {
      const err: any = new Error('A device with this UID is already registered.');
      err.statusCode = 409;
      throw err;
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
    return created;
  }

  async updateDevice(id: string, data: any) {
    const { name, farmId, fieldId, status, model, firmwareVersion, batteryLevel, signalQuality } = data;

    const device = await db.get('SELECT id FROM devices WHERE id = ?', [id]);
    if (!device) {
      const err: any = new Error('Device not found.');
      err.statusCode = 404;
      throw err;
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
        id,
      ]
    );

    const updated = await db.get('SELECT * FROM devices WHERE id = ?', [id]);
    return updated;
  }

  async addMaintenance(id: string, data: any, userFullName: string) {
    const { type, description, performedBy, notes } = data;
    if (!description) {
      const err: any = new Error('Maintenance description is required.');
      err.statusCode = 400;
      throw err;
    }

    const device = await db.get('SELECT id FROM devices WHERE id = ?', [id]);
    if (!device) {
      const err: any = new Error('Device not found.');
      err.statusCode = 404;
      throw err;
    }

    const recordId = uuidv4();
    await db.run(
      `INSERT INTO maintenance_records (id, device_id, type, description, performed_by, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        recordId,
        id,
        type || 'CALIBRATION',
        description.trim(),
        performedBy || userFullName,
        notes || null,
      ]
    );

    const record = await db.get('SELECT * FROM maintenance_records WHERE id = ?', [recordId]);
    return record;
  }

  async deleteDevice(id: string) {
    const device = await db.get('SELECT id FROM devices WHERE id = ?', [id]);
    if (!device) {
      const err: any = new Error('Device not found.');
      err.statusCode = 404;
      throw err;
    }

    await db.run('DELETE FROM devices WHERE id = ?', [id]);
    return { success: true, message: 'Device retired/deleted successfully.' };
  }
}

export const deviceService = new DeviceService();
export default deviceService;
