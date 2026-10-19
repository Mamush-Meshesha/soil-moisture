import { Request, Response, NextFunction } from 'express';
import fieldService from '../services/field.service';
import { AuthRequest } from '../types';

export class FieldController {
  async getAllFields(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { farmId } = req.query;
      const fields = await fieldService.getAllFields(farmId as string | undefined);
      return res.json({ fields });
    } catch (error) {
      next(error);
    }
  }

  async getFieldById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await fieldService.getFieldById(req.params.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async createField(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const field = await fieldService.createField(req.body);
      return res.status(201).json({ field });
    } catch (error) {
      next(error);
    }
  }

  async updateField(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const field = await fieldService.updateField(req.params.id, req.body);
      return res.json({ field });
    } catch (error) {
      next(error);
    }
  }

  async deleteField(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await fieldService.deleteField(req.params.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const fieldController = new FieldController();
export default fieldController;
