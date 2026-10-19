import { Request, Response, NextFunction } from 'express';
import deviceService from '../services/device.service';
import { AuthRequest } from '../types';

export class DeviceController {
  async getAllDevices(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const devices = await deviceService.getAllDevices();
      return res.json({ devices });
    } catch (error) {
      next(error);
    }
  }

  async getDeviceById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await deviceService.getDeviceById(req.params.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async registerDevice(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const device = await deviceService.registerDevice(req.body);
      return res.status(201).json({ device });
    } catch (error) {
      next(error);
    }
  }

  async updateDevice(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const device = await deviceService.updateDevice(req.params.id, req.body);
      return res.json({ device });
    } catch (error) {
      next(error);
    }
  }

  async addMaintenance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const record = await deviceService.addMaintenance(req.params.id, req.body, req.user!.fullName);
      return res.status(201).json({ record });
    } catch (error) {
      next(error);
    }
  }

  async deleteDevice(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await deviceService.deleteDevice(req.params.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const deviceController = new DeviceController();
export default deviceController;
