import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';
import config from '../config/env';

export class AuthService {
  async register(email: string, password: string, fullName: string, organizationName?: string, role?: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      const err: any = new Error('User with this email already exists.');
      err.statusCode = 409;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const assignedRole = role || 'FARM_MANAGER';
    const org = organizationName?.trim() || 'My Farm';

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: normalizedEmail,
        passwordHash,
        fullName: fullName.trim(),
        role: assignedRole,
        organizationName: org,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, fullName: user.fullName, role: user.role, organizationName: user.organizationName },
      config.jwtSecret,
      { expiresIn: (config.jwtExpiresIn || '7d') as any }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        organizationName: user.organizationName,
      },
    };
  }

  async login(email: string, password: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      const err: any = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      const err: any = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, fullName: user.fullName, role: user.role, organizationName: user.organizationName },
      config.jwtSecret,
      { expiresIn: (config.jwtExpiresIn || '7d') as any }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        organizationName: user.organizationName,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        organizationName: true,
        createdAt: true,
      },
    });

    if (!user) {
      const err: any = new Error('User profile not found.');
      err.statusCode = 404;
      throw err;
    }

    return user;
  }
}

export const authService = new AuthService();
export default authService;
