import { Request } from 'express';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  fullName: string;
  organizationName: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  details?: any;
}
