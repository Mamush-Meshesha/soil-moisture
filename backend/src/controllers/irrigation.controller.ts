import { Request, Response, NextFunction } from 'express';
import irrigationService from '../services/irrigation.service';
import { AuthRequest } from '../types';

export class IrrigationController {
  async getEvents(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { fieldId } = req.query;
      const events = await irrigationService.getEvents(fieldId as string | undefined);
      return res.json({ events });
    } catch (error) {
      next(error);
    }
  }

  async logEvent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const event = await irrigationService.logEvent(req.body);
      return res.status(201).json({ event });
    } catch (error) {
      next(error);
    }
  }

  async getGuidance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const guidance = await irrigationService.getGuidance();
      return res.json({ guidance });
    } catch (error) {
      next(error);
    }
  }
}

export const irrigationController = new IrrigationController();
export default irrigationController;
