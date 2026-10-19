import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { AuthRequest, authenticate } from '../middleware/auth';

const router = Router();

// GET all fields
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { farmId } = req.query;
    let query = `
      SELECT f.*,
        fm.name as farm_name,
        (SELECT COUNT(*) FROM devices WHERE field_id = f.id) as devices_count,
        (SELECT COUNT(*) FROM alerts WHERE field_id = f.id AND status = 'ACTIVE') as active_alerts_count,
        (
          SELECT ROUND(AVG(sr.vwc_percent), 1)
          FROM sensor_readings sr
          WHERE sr.field_id = f.id AND sr.measured_at >= datetime('now', '-24 hours')
        ) as current_vwc,
        (
          SELECT ROUND(AVG(sr.temp_c), 1)
          FROM sensor_readings sr
          WHERE sr.field_id = f.id AND sr.measured_at >= datetime('now', '-24 hours')
        ) as current_temp
      FROM fields f
      JOIN farms fm ON f.farm_id = fm.id
    `;
    const params: any[] = [];
    if (farmId) {
      query += ' WHERE f.farm_id = ?';
      params.push(farmId);
    }
    query += ' ORDER BY f.created_at DESC';

    const fields = await db.all<any>(query, params);
    const normalizedFields = fields.map((f: any) => ({
      ...f,
      current_vwc: f.current_vwc !== null && f.current_vwc !== undefined ? Number(f.current_vwc) : null,
      current_temp: f.current_temp !== null && f.current_temp !== undefined ? Number(f.current_temp) : null,
      devices_count: Number(f.devices_count || 0),
      active_alerts_count: Number(f.active_alerts_count || 0),
    }));
    return res.json({ fields: normalizedFields });
  } catch (error: any) {
    console.error('Error fetching fields:', error);
    return res.status(500).json({ error: 'Failed to retrieve fields.' });
  }
});

// GET single field details
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const field = await db.get<any>(
      `SELECT f.*, fm.name as farm_name, fm.location as farm_location
       FROM fields f
       JOIN farms fm ON f.farm_id = fm.id
       WHERE f.id = ?`,
      [req.params.id]
    );

    if (!field) {
      return res.status(404).json({ error: 'Field not found.' });
    }

    const devices = await db.all<any>('SELECT * FROM devices WHERE field_id = ? ORDER BY created_at DESC', [field.id]);
    const alertRules = await db.all<any>('SELECT * FROM alert_rules WHERE field_id = ?', [field.id]);
    const recentAlerts = await db.all<any>(
      'SELECT * FROM alerts WHERE field_id = ? ORDER BY triggered_at DESC LIMIT 5',
      [field.id]
    );

    // Latest moisture profile across all depths for this field
    const latestDepths = await db.all<any>(
      `SELECT sr.depth_cm, sr.vwc_percent, sr.temp_c, sr.ec_ds_m, sr.measured_at
       FROM sensor_readings sr
       WHERE sr.field_id = ?
       AND sr.measured_at = (SELECT MAX(measured_at) FROM sensor_readings WHERE field_id = ?)
       ORDER BY sr.depth_cm ASC`,
      [field.id, field.id]
    );

    return res.json({
      field,
      devices,
      alertRules,
      recentAlerts,
      latestProfile: latestDepths,
    });
  } catch (error: any) {
    console.error('Error fetching field details:', error);
    return res.status(500).json({ error: 'Failed to retrieve field details.' });
  }
});

// CREATE field
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const {
      farmId,
      name,
      cropType,
      plantingDate,
      soilType,
      targetMinMoisture,
      targetMaxMoisture,
      areaHa,
      rootDepthCm,
    } = req.body;

    if (!farmId || !name || !cropType) {
      return res.status(400).json({ error: 'Farm ID, field name, and crop type are required.' });
    }

    const fieldId = uuidv4();
    await db.run(
      `INSERT INTO fields (id, farm_id, name, crop_type, planting_date, soil_type, target_min_moisture, target_max_moisture, area_ha, root_depth_cm)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fieldId,
        farmId,
        name.trim(),
        cropType.trim(),
        plantingDate || null,
        soilType || 'Loam',
        targetMinMoisture !== undefined ? parseFloat(targetMinMoisture) : 20.0,
        targetMaxMoisture !== undefined ? parseFloat(targetMaxMoisture) : 40.0,
        areaHa !== undefined ? parseFloat(areaHa) : 1.0,
        rootDepthCm !== undefined ? parseInt(rootDepthCm, 10) : 40,
      ]
    );

    // Create default alert rules for this field
    const rule1Id = uuidv4();
    const rule2Id = uuidv4();
    await db.run(
      `INSERT INTO alert_rules (id, field_id, rule_name, metric, operator, threshold, severity)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [rule1Id, fieldId, 'Moisture Deficit (Below Target)', 'VWC', '<', targetMinMoisture || 20.0, 'WARNING']
    );
    await db.run(
      `INSERT INTO alert_rules (id, field_id, rule_name, metric, operator, threshold, severity)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [rule2Id, fieldId, 'Over-saturation (Risk of Runoff)', 'VWC', '>', targetMaxMoisture || 40.0, 'INFO']
    );

    const created = await db.get('SELECT * FROM fields WHERE id = ?', [fieldId]);
    return res.status(201).json({ field: created });
  } catch (error: any) {
    console.error('Error creating field:', error);
    return res.status(500).json({ error: 'Failed to create field.' });
  }
});

// UPDATE field
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const {
      name,
      cropType,
      plantingDate,
      soilType,
      targetMinMoisture,
      targetMaxMoisture,
      areaHa,
      rootDepthCm,
    } = req.body;

    const field = await db.get('SELECT id FROM fields WHERE id = ?', [req.params.id]);
    if (!field) {
      return res.status(404).json({ error: 'Field not found.' });
    }

    await db.run(
      `UPDATE fields
       SET name = COALESCE(?, name),
           crop_type = COALESCE(?, crop_type),
           planting_date = COALESCE(?, planting_date),
           soil_type = COALESCE(?, soil_type),
           target_min_moisture = COALESCE(?, target_min_moisture),
           target_max_moisture = COALESCE(?, target_max_moisture),
           area_ha = COALESCE(?, area_ha),
           root_depth_cm = COALESCE(?, root_depth_cm)
       WHERE id = ?`,
      [
        name ? name.trim() : null,
        cropType ? cropType.trim() : null,
        plantingDate || null,
        soilType || null,
        targetMinMoisture !== undefined ? parseFloat(targetMinMoisture) : null,
        targetMaxMoisture !== undefined ? parseFloat(targetMaxMoisture) : null,
        areaHa !== undefined ? parseFloat(areaHa) : null,
        rootDepthCm !== undefined ? parseInt(rootDepthCm, 10) : null,
        req.params.id,
      ]
    );

    const updated = await db.get('SELECT * FROM fields WHERE id = ?', [req.params.id]);
    return res.json({ field: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update field.' });
  }
});

// DELETE field
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const field = await db.get('SELECT id FROM fields WHERE id = ?', [req.params.id]);
    if (!field) {
      return res.status(404).json({ error: 'Field not found.' });
    }

    await db.run('DELETE FROM fields WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Field deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to delete field.' });
  }
});

export default router;
