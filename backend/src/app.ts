import express from 'express';
import cors from 'cors';
import apiRouter from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'AquaScope Water Quality Testing & Microbiological Telemetry Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Remote cloud setup & migration trigger (useful for Render/Neon on-demand provisioning)
app.all('/api/health/setup', async (req, res) => {
  try {
    const { execSync } = await import('child_process');
    console.log('[Setup] Applying Prisma migrations to remote database...');
    let migrateOutput = '';
    try {
      migrateOutput = execSync('npx prisma migrate deploy', { encoding: 'utf-8' });
    } catch (migErr: any) {
      console.warn('[Setup] migrate deploy warning, running prisma db push:', migErr.message);
      migrateOutput = execSync('npx prisma db push --accept-data-loss', { encoding: 'utf-8' });
    }

    console.log('[Setup] Seeding initial platform data...');
    const { seedDatabase } = await import('./seed');
    await seedDatabase();

    return res.json({
      success: true,
      message: 'Database schema successfully migrated and seeded!',
      output: migrateOutput,
    });
  } catch (err: any) {
    console.error('[Setup Error]:', err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Fast Direct DDL & Seed sync endpoint (creates tables instantly without migration lock delays)
app.all('/api/health/sync-db', async (req, res) => {
  try {
    const prisma = (await import('./prisma')).default;

    // Ensure projects table exists
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "projects" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "title" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "category_key" TEXT NOT NULL DEFAULT 'field',
        "date" TEXT NOT NULL,
        "location" TEXT NOT NULL,
        "image" TEXT NOT NULL,
        "summary" TEXT NOT NULL,
        "objective" TEXT NOT NULL,
        "method" TEXT NOT NULL,
        "key_findings_json" TEXT NOT NULL,
        "partner" TEXT,
        "translations_json" TEXT,
        "order" INTEGER DEFAULT 0,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure products table exists
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "products" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "price" DOUBLE PRECISION NOT NULL,
        "description" TEXT NOT NULL,
        "specs_json" TEXT NOT NULL,
        "image_url" TEXT NOT NULL,
        "in_stock" INTEGER DEFAULT 1,
        "stock_qty" INTEGER DEFAULT 50,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Run seedDatabase
    const { seedDatabase } = await import('./seed');
    await seedDatabase();

    return res.json({
      success: true,
      message: 'PostgreSQL tables (projects, products, etc.) and dynamic seed synchronized successfully!',
    });
  } catch (err: any) {
    console.error('[Sync DB Error]:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Consolidated API routes
app.use('/api', apiRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
export { app };
