import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';
import { db } from '../db';

export class FarmService {
  async getAllFarms() {
    const farms = await db.all<any>(
      `SELECT f.*,
        (SELECT COUNT(*) FROM fields WHERE farm_id = f.id) as fields_count,
        (SELECT COUNT(*) FROM devices WHERE farm_id = f.id) as devices_count,
        (SELECT COUNT(*) FROM alerts a JOIN fields fl ON a.field_id = fl.id WHERE fl.farm_id = f.id AND a.status = 'ACTIVE') as active_alerts_count,
        (
          SELECT ROUND((AVG(sr.vwc_percent))::numeric, 1)
          FROM sensor_readings sr
          JOIN devices d ON sr.device_id = d.id
          WHERE d.farm_id = f.id AND sr.measured_at >= datetime('now', '-24 hours')
        ) as avg_moisture_24h
       FROM farms f
       ORDER BY f.created_at DESC`
    );

    return farms.map((f: any) => ({
      ...f,
      fields_count: Number(f.fields_count || 0),
      devices_count: Number(f.devices_count || 0),
      active_alerts_count: Number(f.active_alerts_count || 0),
      avg_moisture_24h: f.avg_moisture_24h !== null && f.avg_moisture_24h !== undefined ? Number(f.avg_moisture_24h) : null,
    }));
  }

  async getFarmById(id: string) {
    const farm = await prisma.farm.findUnique({
      where: { id },
    });

    if (!farm) {
      const err: any = new Error('Farm not found.');
      err.statusCode = 404;
      throw err;
    }

    const fields = await db.all<any>(
      `SELECT f.*,
        (SELECT COUNT(*) FROM devices WHERE field_id = f.id) as devices_count,
        (SELECT COUNT(*) FROM alerts WHERE field_id = f.id AND status = 'ACTIVE') as active_alerts_count,
        (
          SELECT ROUND((AVG(sr.vwc_percent))::numeric, 1)
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

    return { farm, fields, devices };
  }

  async createFarm(userId: string, data: any) {
    const { name, location, latitude, longitude, timezone, totalAreaHa, description } = data;
    const farm = await prisma.farm.create({
      data: {
        id: uuidv4(),
        userId,
        name: name.trim(),
        location: location.trim(),
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        timezone: timezone || 'UTC',
        totalAreaHa: totalAreaHa ? parseFloat(totalAreaHa) : 0,
        description: description || null,
      },
    });

    return farm;
  }

  async updateFarm(id: string, data: any) {
    const existing = await prisma.farm.findUnique({ where: { id } });
    if (!existing) {
      const err: any = new Error('Farm not found.');
      err.statusCode = 404;
      throw err;
    }

    const { name, location, latitude, longitude, timezone, totalAreaHa, description } = data;
    const updated = await prisma.farm.update({
      where: { id },
      data: {
        name: name !== undefined ? name.trim() : undefined,
        location: location !== undefined ? location.trim() : undefined,
        latitude: latitude !== undefined ? parseFloat(latitude) : undefined,
        longitude: longitude !== undefined ? parseFloat(longitude) : undefined,
        timezone: timezone !== undefined ? timezone : undefined,
        totalAreaHa: totalAreaHa !== undefined ? parseFloat(totalAreaHa) : undefined,
        description: description !== undefined ? description : undefined,
      },
    });

    return updated;
  }

  async deleteFarm(id: string) {
    const existing = await prisma.farm.findUnique({ where: { id } });
    if (!existing) {
      const err: any = new Error('Farm not found.');
      err.statusCode = 404;
      throw err;
    }

    await prisma.farm.delete({ where: { id } });
    return { success: true, message: 'Farm deleted successfully.' };
  }
}

export const farmService = new FarmService();
export default farmService;
