import { Request, Response, NextFunction } from 'express';
import telemetryService from '../services/telemetry.service';

export class TelemetryController {
  async ingest(req: Request, res: Response, next: NextFunction) {
    try {
      const idempotencyKey = (req.headers['x-idempotency-key'] as string) || null;
      const result = await telemetryService.ingest(req.body, idempotencyKey);
      return res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async getLatest(req: Request, res: Response, next: NextFunction) {
    try {
      const { fieldId, deviceId } = req.query;
      const readings = await telemetryService.getLatest(fieldId as string, deviceId as string);
      return res.json({ readings });
    } catch (error) {
      next(error);
    }
  }

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { fieldId, deviceId, depthCm, startDate, endDate, limit } = req.query;
      const readings = await telemetryService.getHistory({
        fieldId: fieldId as string,
        deviceId: deviceId as string,
        depthCm: depthCm as string,
        startDate: startDate as string,
        endDate: endDate as string,
        limit: limit as string,
      });
      return res.json({ readings, count: readings.length });
    } catch (error) {
      next(error);
    }
  }

  async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const { fieldId, deviceId } = req.query;
      const analytics = await telemetryService.getAnalytics(fieldId as string, deviceId as string);
      return res.json(analytics);
    } catch (error) {
      next(error);
    }
  }
}

export const telemetryController = new TelemetryController();
export default telemetryController;
