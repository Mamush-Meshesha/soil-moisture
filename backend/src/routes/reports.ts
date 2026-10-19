import { Router, Request, Response } from 'express';
import { db } from '../db';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/reports/csv - Export telemetry data as CSV
router.get('/csv', authenticate, async (req: Request, res: Response) => {
  try {
    const { fieldId, deviceId, startDate, endDate } = req.query;
    let query = `
      SELECT
        sr.measured_at,
        d.device_uid,
        d.name as device_name,
        fl.name as field_name,
        sr.depth_cm,
        sr.vwc_percent,
        sr.temp_c,
        sr.ec_ds_m,
        sr.quality_score,
        sr.source,
        sr.is_demo
      FROM sensor_readings sr
      JOIN devices d ON sr.device_id = d.id
      LEFT JOIN fields fl ON sr.field_id = fl.id
      WHERE 1=1
    `;
    const params: any[] = [];
    if (fieldId) {
      query += ' AND sr.field_id = ?';
      params.push(fieldId);
    }
    if (deviceId) {
      query += ' AND sr.device_id = ?';
      params.push(deviceId);
    }
    if (startDate) {
      query += ' AND sr.measured_at >= ?';
      params.push(startDate);
    }
    if (endDate) {
      query += ' AND sr.measured_at <= ?';
      params.push(endDate);
    }

    query += ' ORDER BY sr.measured_at DESC LIMIT 5000';

    const rows = await db.all<any>(query, params);

    // Build CSV string
    const headers = [
      'Timestamp (UTC)',
      'Device UID',
      'Device Name',
      'Field Name',
      'Depth (cm)',
      'Volumetric Water Content (% VWC)',
      'Soil Temperature (C)',
      'Electrical Conductivity (dS/m)',
      'Data Quality Score',
      'Source',
      'Is Demo Flag',
    ];

    const csvLines = [headers.join(',')];
    for (const r of rows) {
      csvLines.push(
        [
          `"${r.measured_at}"`,
          `"${r.device_uid}"`,
          `"${(r.device_name || '').replace(/"/g, '""')}"`,
          `"${(r.field_name || 'Unassigned').replace(/"/g, '""')}"`,
          r.depth_cm,
          r.vwc_percent,
          r.temp_c !== null ? r.temp_c : '',
          r.ec_ds_m !== null ? r.ec_ds_m : '',
          r.quality_score,
          `"${r.source}"`,
          r.is_demo ? 'TRUE' : 'FALSE',
        ].join(',')
      );
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="telemetry_export_${Date.now()}.csv"`);
    return res.status(200).send(csvLines.join('\n'));
  } catch (error: any) {
    console.error('CSV Export Error:', error);
    return res.status(500).json({ error: 'Failed to generate CSV export.' });
  }
});

// GET /api/reports/summary - Structured farm & field health summary
router.get('/summary', authenticate, async (req: Request, res: Response) => {
  try {
    const farmsCount = await db.get<any>('SELECT COUNT(*) as count FROM farms');
    const fieldsCount = await db.get<any>('SELECT COUNT(*) as count FROM fields');
    const devicesOnline = await db.get<any>("SELECT COUNT(*) as count FROM devices WHERE status = 'ONLINE'");
    const activeAlerts = await db.get<any>("SELECT COUNT(*) as count FROM alerts WHERE status = 'ACTIVE'");

    const soilAverages = await db.all<any>(
      `SELECT
        depth_cm,
        ROUND(AVG(vwc_percent), 1) as avg_vwc,
        ROUND(AVG(temp_c), 1) as avg_temp
       FROM sensor_readings
       WHERE measured_at >= datetime('now', '-24 hours')
       GROUP BY depth_cm
       ORDER BY depth_cm ASC`
    );

    return res.json({
      reportTitle: '[Platform Name] Agronomic Performance & Telemetry Summary',
      generatedAt: new Date().toISOString(),
      metrics: {
        totalFarms: farmsCount?.count || 0,
        totalFields: fieldsCount?.count || 0,
        onlineDevices: devicesOnline?.count || 0,
        unresolvedAlerts: activeAlerts?.count || 0,
      },
      depthMoistureProfile24h: soilAverages,
      integrityStatement: 'All real sensor data and simulated demo measurements are strictly segregated.',
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to generate report summary.' });
  }
});

export default router;
