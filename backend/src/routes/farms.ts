import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { AuthRequest, authenticate } from '../middleware/auth';

const router = Router();

// GET all farms with aggregated statistics
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const farms = await db.all<any>(
      `SELECT f.*,
        (SELECT COUNT(*) FROM fields WHERE farm_id = f.id) as fields_count,
        (SELECT COUNT(*) FROM devices WHERE farm_id = f.id) as devices_count,
        (SELECT COUNT(*) FROM alerts a JOIN fields fl ON a.field_id = fl.id WHERE fl.farm_id = f.id AND a.status = 'ACTIVE') as active_alerts_count,
        (
          SELECT ROUND(AVG(sr.vwc_percent), 1)
          FROM sensor_readings sr
          JOIN devices d ON sr.device_id = d.id
          WHERE d.farm_id = f.id AND sr.measured_at >= datetime('now', '-24 hours')
        ) as avg_moisture_24h
       FROM farms f
       ORDER BY f.created_at DESC`
    );

    const normalizedFarms = farms.map((f: any) => ({
      ...f,
      fields_count: Number(f.fields_count || 0),
      devices_count: Number(f.devices_count || 0),
      active_alerts_count: Number(f.active_alerts_count || 0),
      avg_moisture_24h: f.avg_moisture_24h !== null && f.avg_moisture_24h !== undefined ? Number(f.avg_moisture_24h) : null,
    }));

    return res.json({ farms: normalizedFarms });
  } catch (error: any) {
    console.error('Error fetching farms:', error);
    return res.status(500).json({ error: 'Failed to retrieve farms.' });
  }
});

// GET single farm details with fields and devices
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const farm = await db.get<any>('SELECT * FROM farms WHERE id = ?', [req.params.id]);
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found.' });
    }

    const fields = await db.all<any>(
      `SELECT f.*,
        (SELECT COUNT(*) FROM devices WHERE field_id = f.id) as devices_count,
        (SELECT COUNT(*) FROM alerts WHERE field_id = f.id AND status = 'ACTIVE') as active_alerts_count,
        (
          SELECT ROUND(AVG(sr.vwc_percent), 1)
          FROM sensor_readings sr
          WHERE sr.field_id = f.id AND sr.measured_at >= datetime('now', '-24 hours')
        ) as current_vwc
       FROM fields f
       WHERE f.farm_id = ?
       ORDER BY f.created_at ASC`,
      [farm.id]
    );

    const devices = await db.all<any>(
      `SELECT d.*, f.name as field_name
       FROM devices d
       LEFT JOIN fields f ON d.field_id = f.id
       WHERE d.farm_id = ?
       ORDER BY d.created_at DESC`,
      [farm.id]
    );

    return res.json({ farm, fields, devices });
  } catch (error: any) {
    console.error('Error fetching farm details:', error);
    return res.status(500).json({ error: 'Failed to retrieve farm details.' });
  }
});

// CREATE farm
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, location, latitude, longitude, timezone, totalAreaHa, description } = req.body;
    if (!name || !location) {
      return res.status(400).json({ error: 'Farm name and location are required.' });
    }

    const farmId = uuidv4();
    await db.run(
      `INSERT INTO farms (id, user_id, name, location, latitude, longitude, timezone, total_area_ha, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        farmId,
        req.user!.id,
        name.trim(),
        location.trim(),
        latitude ? parseFloat(latitude) : null,
        longitude ? parseFloat(longitude) : null,
        timezone || 'UTC',
        totalAreaHa ? parseFloat(totalAreaHa) : 0,
        description || null,
      ]
    );

    const newFarm = await db.get('SELECT * FROM farms WHERE id = ?', [farmId]);
    return res.status(201).json({ farm: newFarm });
  } catch (error: any) {
    console.error('Error creating farm:', error);
    return res.status(500).json({ error: 'Failed to create farm.' });
  }
});

// UPDATE farm
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, location, latitude, longitude, timezone, totalAreaHa, description } = req.body;
    const farm = await db.get('SELECT * FROM farms WHERE id = ?', [req.params.id]);
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found.' });
    }

    await db.run(
      `UPDATE farms
       SET name = COALESCE(?, name),
           location = COALESCE(?, location),
           latitude = COALESCE(?, latitude),
           longitude = COALESCE(?, longitude),
           timezone = COALESCE(?, timezone),
           total_area_ha = COALESCE(?, total_area_ha),
           description = COALESCE(?, description)
       WHERE id = ?`,
      [
        name ? name.trim() : null,
        location ? location.trim() : null,
        latitude !== undefined ? parseFloat(latitude) : null,
        longitude !== undefined ? parseFloat(longitude) : null,
        timezone || null,
        totalAreaHa !== undefined ? parseFloat(totalAreaHa) : null,
        description !== undefined ? description : null,
        req.params.id,
      ]
    );

    const updated = await db.get('SELECT * FROM farms WHERE id = ?', [req.params.id]);
    return res.json({ farm: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update farm.' });
  }
});

// DELETE farm
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const farm = await db.get('SELECT id FROM farms WHERE id = ?', [req.params.id]);
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found.' });
    }

    await db.run('DELETE FROM farms WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Farm deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to delete farm.' });
  }
});

export default router;
