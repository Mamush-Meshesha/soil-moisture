import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'agtech-development-secret-jwt-key-2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/soil_moisture_db?schema=public',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'dmjtytstd',
    apiKey: process.env.CLOUDINARY_API_KEY || '216288979336725',
    apiSecret: process.env.CLOUDINARY_API_SECRET || 'MJufkalWaCALwEvLyXT7cd-48hY',
  },
};

export default config;
