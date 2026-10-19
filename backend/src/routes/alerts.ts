import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { AuthRequest, authenticate } from '../middleware/auth';

const router = Router();

// GET all alerts
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { status, severity, fieldId } = req.query;
    let query = `
      SELECT a.*,
        fl.name as field_name,
        fm.name as farm_name,
        d.name as device_name,
        d.device_uid
      FROM alerts a
      LEFT JOIN fields fl ON a.field_id = fl.id
      LEFT JOIN farms fm ON fl.farm_id = fm.id
      LEFT JOIN devices d ON a.device_id = d.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      query += ' AND a.status = ?';
      params.push(status);
    }
    if (severity) {
      query += ' AND a.severity = ?';
      params.push(severity);
    }
    if (fieldId) {
      query += ' AND a.field_id = ?';
      params.push(fieldId);
    }

    query += ' ORDER BY a.triggered_at DESC LIMIT 100';

    const alerts = await db.all<any>(query, params);
    return res.json({ alerts });
  } catch (error: any) {
    console.error('Error fetching alerts:', error);
    return res.status(500).json({ error: 'Failed to retrieve alerts.' });
  }
});

// ACKNOWLEDGE alert
router.put('/:id/acknowledge', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const alert = await db.get('SELECT id, status FROM alerts WHERE id = ?', [req.params.id]);
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found.' });
    }

    await db.run(
      `UPDATE alerts
       SET status = 'ACKNOWLEDGED',
           acknowledged_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [req.params.id]
    );

    const updated = await db.get('SELECT * FROM alerts WHERE id = ?', [req.params.id]);
    return res.json({ alert: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to acknowledge alert.' });
  }
});

// RESOLVE alert
router.put('/:id/resolve', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const alert = await db.get('SELECT id FROM alerts WHERE id = ?', [req.params.id]);
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found.' });
    }

    await db.run(
      `UPDATE alerts
       SET status = 'RESOLVED',
           resolved_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [req.params.id]
    );

    const updated = await db.get('SELECT * FROM alerts WHERE id = ?', [req.params.id]);
    return res.json({ alert: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to resolve alert.' });
  }
});

// GET alert rules
router.get('/rules', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { fieldId } = req.query;
    let query = `
      SELECT ar.*, fl.name as field_name, fm.name as farm_name
      FROM alert_rules ar
      JOIN fields fl ON ar.field_id = fl.id
      JOIN farms fm ON fl.farm_id = fm.id
    `;
    const params: any[] = [];
    if (fieldId) {
      query += ' WHERE ar.field_id = ?';
      params.push(fieldId);
    }
    query += ' ORDER BY ar.created_at DESC';

    const rules = await db.all<any>(query, params);
    return res.json({ rules });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve alert rules.' });
  }
});

// CREATE alert rule
router.post('/rules', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { fieldId, ruleName, metric, operator, threshold, severity } = req.body;
    if (!fieldId || !ruleName || threshold === undefined) {
      return res.status(400).json({ error: 'Field ID, rule name, and threshold are required.' });
    }

    const ruleId = uuidv4();
    await db.run(
      `INSERT INTO alert_rules (id, field_id, rule_name, metric, operator, threshold, severity)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        ruleId,
        fieldId,
        ruleName.trim(),
        metric || 'VWC',
        operator || '<',
        parseFloat(threshold),
        severity || 'WARNING',
      ]
    );

    const created = await db.get('SELECT * FROM alert_rules WHERE id = ?', [ruleId]);
    return res.status(201).json({ rule: created });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to create alert rule.' });
  }
});

// DELETE alert rule
router.delete('/rules/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    await db.run('DELETE FROM alert_rules WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Alert rule removed.' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to delete alert rule.' });
  }
});

export default router;
