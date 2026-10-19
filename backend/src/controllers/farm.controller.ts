import { Request, Response, NextFunction } from 'express';
import farmService from '../services/farm.service';
import { AuthRequest } from '../types';

export class FarmController {
  async getAllFarms(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const farms = await farmService.getAllFarms();
      return res.json({ farms });
    } catch (error) {
      next(error);
    }
  }

  async getFarmById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await farmService.getFarmById(req.params.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async createFarm(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, location } = req.body;
      if (!name || !location) {
        return res.status(400).json({ error: 'Farm name and location are required.' });
      }

      const farm = await farmService.createFarm(req.user!.id, req.body);
      return res.status(201).json({ farm });
    } catch (error) {
      next(error);
    }
  }

  async updateFarm(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const farm = await farmService.updateFarm(req.params.id, req.body);
      return res.json({ farm });
    } catch (error) {
      next(error);
    }
  }

  async deleteFarm(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await farmService.deleteFarm(req.params.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const farmController = new FarmController();
export default farmController;
