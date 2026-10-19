import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { AuthRequest } from '../types';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, fullName, organizationName, role } = req.body;
      if (!email || !password || !fullName) {
        return res.status(400).json({ error: 'Email, password, and full name are required.' });
      }

      const result = await authService.register(email, password, fullName, organizationName, role);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const result = await authService.login(email, password);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await authService.getProfile(req.user!.id);
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
export default authController;
