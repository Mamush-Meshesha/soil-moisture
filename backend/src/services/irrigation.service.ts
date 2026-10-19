import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';
import { db } from '../db';

export class IrrigationService {
  async getEvents(fieldId?: string) {
    let query = `
      SELECT ie.*, fl.name as field_name, fm.name as farm_name, fl.crop_type
      FROM irrigation_events ie
      JOIN fields fl ON ie.field_id = fl.id
      JOIN farms fm ON fl.farm_id = fm.id
    `;
    const params: any[] = [];
    if (fieldId) {
      query += ' WHERE ie.field_id = ?';
      params.push(fieldId);
    }
    query += ' ORDER BY ie.scheduled_at DESC LIMIT 50';

    const events = await db.all<any>(query, params);
    return events;
  }

  async logEvent(data: any) {
    const { fieldId, scheduledAt, durationMinutes, waterAppliedMm, method, notes } = data;
    if (!fieldId || !waterAppliedMm) {
      const err: any = new Error('Field ID and water applied (mm) are required.');
      err.statusCode = 400;
      throw err;
    }

    const eventId = uuidv4();
    await db.run(
      `INSERT INTO irrigation_events (id, field_id, scheduled_at, duration_minutes, water_applied_mm, method, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        eventId,
        fieldId,
        scheduledAt ? new Date(scheduledAt).toISOString() : new Date().toISOString(),
        durationMinutes ? parseInt(durationMinutes, 10) : 60,
        parseFloat(waterAppliedMm),
        method || 'Drip Irrigation',
        notes || null,
      ]
    );

    const event = await db.get('SELECT * FROM irrigation_events WHERE id = ?', [eventId]);
    return event;
  }

  async getGuidance() {
    const fields = await db.all<any>(
      `SELECT f.*, fm.name as farm_name,
        (
          SELECT ROUND(AVG(sr.vwc_percent), 1)
          FROM sensor_readings sr
          WHERE sr.field_id = f.id AND sr.measured_at >= datetime('now', '-24 hours')
        ) as current_vwc
       FROM fields f
       JOIN farms fm ON f.farm_id = fm.id`
    );

    const guidanceList = fields.map((f) => {
      const current = typeof f.current_vwc === 'number'
        ? f.current_vwc
        : (parseFloat(String(f.current_vwc ?? 28.0)) || 28.0);
      const targetMin = typeof f.target_min_moisture === 'number'
        ? f.target_min_moisture
        : (parseFloat(String(f.target_min_moisture ?? 20.0)) || 20.0);
      const targetMax = typeof f.target_max_moisture === 'number'
        ? f.target_max_moisture
        : (parseFloat(String(f.target_max_moisture ?? 38.0)) || 38.0);
      const rootDepth = typeof f.root_depth_cm === 'number'
        ? f.root_depth_cm
        : (parseInt(String(f.root_depth_cm ?? 40), 10) || 40);

      let status: 'CRITICAL_DEFICIT' | 'LOW' | 'OPTIMAL' | 'SATURATED' = 'OPTIMAL';
      let recommendedMm = 0;
      let guidanceText = 'Soil moisture is in the optimal agronomic band.';

      if (current < targetMin - 5) {
        status = 'CRITICAL_DEFICIT';
        recommendedMm = Math.round(((targetMin + 5 - current) / 100) * (rootDepth * 10));
        guidanceText = `Severe soil moisture deficit detected below wilting threshold. Apply ~${recommendedMm}mm via low-pressure drip.`;
      } else if (current < targetMin) {
        status = 'LOW';
        recommendedMm = Math.round(((targetMin + 2 - current) / 100) * (rootDepth * 10));
        guidanceText = `Moisture below management allowable depletion. Irrigation recommended in next 24-48 hours (~${recommendedMm}mm).`;
      } else if (current > targetMax) {
        status = 'SATURATED';
        recommendedMm = 0;
        guidanceText = 'Soil at or above field capacity. Risk of anaerobic root stress and deep percolation runoff. Cease irrigation.';
      }

      return {
        fieldId: f.id,
        fieldName: f.name,
        cropType: f.crop_type,
        soilType: f.soil_type,
        currentVwc: current,
        targetMin,
        targetMax,
        rootDepthCm: rootDepth,
        status,
        recommendedWaterMm: recommendedMm,
        guidanceText,
        disclaimer: 'Advisory estimate based on soil capacitance thresholds; confirm with local weather forecast prior to valve activation.',
      };
    });

    return guidanceList;
  }
}

export const irrigationService = new IrrigationService();
export default irrigationService;
