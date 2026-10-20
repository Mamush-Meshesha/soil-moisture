import app from './app';
import config from './config/env';
import { initDatabase, prisma } from './db';

const PORT = config.port;

// Start server
async function startServer() {
  try {
    await initDatabase();

    // Auto-seed if database is fresh (no products yet)
    try {
      const productCount = await prisma.product.count();
      if (productCount === 0) {
        console.log('Empty database detected. Seeding initial platform data...');
        const { seedDatabase } = await import('./seed');
        await seedDatabase();
        console.log('Initial platform data seeded successfully.');
      }
    } catch (seedErr: any) {
      // Table may not exist yet if migrations are pending
      console.warn('Auto-seed check note:', seedErr.message);
    }

    const server = app.listen(PORT, () => {
      console.log(`[Platform Name] Backend Server running in ${config.nodeEnv} mode on port ${PORT}`);
    });

    // Graceful shutdown handling
    const shutdown = async (signal: string) => {
      console.log(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        try {
          await prisma.$disconnect();
          console.log('Database connections closed.');
          process.exit(0);
        } catch (err) {
          console.error('Error during shutdown:', err);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err: any) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

// Only start listener when not in test environment
if (config.nodeEnv !== 'test') {
  startServer();
}

export default app;
export { app };
