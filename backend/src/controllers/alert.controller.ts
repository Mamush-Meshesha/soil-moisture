import { Request, Response, NextFunction } from 'express';
import alertService from '../services/alert.service';
import { AuthRequest } from '../types';

export class AlertController {
  async getAllAlerts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status, severity, fieldId } = req.query;
      const alerts = await alertService.getAllAlerts({
        status: status as string | undefined,
        severity: severity as string | undefined,
        fieldId: fieldId as string | undefined,
      });
      return res.json({ alerts });
    } catch (error) {
      next(error);
    }
  }

  async acknowledgeAlert(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const alert = await alertService.acknowledgeAlert(req.params.id);
      return res.json({ alert });
    } catch (error) {
      next(error);
    }
  }

  async resolveAlert(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const alert = await alertService.resolveAlert(req.params.id);
      return res.json({ alert });
    } catch (error) {
      next(error);
    }
  }

  async getAlertRules(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { fieldId } = req.query;
      const rules = await alertService.getAlertRules(fieldId as string | undefined);
      return res.json({ rules });
    } catch (error) {
      next(error);
    }
  }

  async createAlertRule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const rule = await alertService.createAlertRule(req.body);
      return res.status(201).json({ rule });
    } catch (error) {
      next(error);
    }
  }

  async deleteAlertRule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await alertService.deleteAlertRule(req.params.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const alertController = new AlertController();
export default alertController;
