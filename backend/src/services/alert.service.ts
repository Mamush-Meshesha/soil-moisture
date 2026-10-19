import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';
import { db } from '../db';

export class AlertService {
  async getAllAlerts(filters: { status?: string; severity?: string; fieldId?: string }) {
    const { status, severity, fieldId } = filters;
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
    return alerts;
  }

  async acknowledgeAlert(id: string) {
    const alert = await db.get('SELECT id, status FROM alerts WHERE id = ?', [id]);
    if (!alert) {
      const err: any = new Error('Alert not found.');
      err.statusCode = 404;
      throw err;
    }

    await db.run(
      `UPDATE alerts
       SET status = 'ACKNOWLEDGED',
           acknowledged_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [id]
    );

    const updated = await db.get('SELECT * FROM alerts WHERE id = ?', [id]);
    return updated;
  }

  async resolveAlert(id: string) {
    const alert = await db.get('SELECT id FROM alerts WHERE id = ?', [id]);
    if (!alert) {
      const err: any = new Error('Alert not found.');
      err.statusCode = 404;
      throw err;
    }

    await db.run(
      `UPDATE alerts
       SET status = 'RESOLVED',
           resolved_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [id]
    );

    const updated = await db.get('SELECT * FROM alerts WHERE id = ?', [id]);
    return updated;
  }

  async getAlertRules(fieldId?: string) {
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
    return rules;
  }

  async createAlertRule(data: any) {
    const { fieldId, ruleName, metric, operator, threshold, severity } = data;
    if (!fieldId || !ruleName || threshold === undefined) {
      const err: any = new Error('Field ID, rule name, and threshold are required.');
      err.statusCode = 400;
      throw err;
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
    return created;
  }

  async deleteAlertRule(id: string) {
    await db.run('DELETE FROM alert_rules WHERE id = ?', [id]);
    return { success: true, message: 'Alert rule removed.' };
  }
}

export const alertService = new AlertService();
export default alertService;
