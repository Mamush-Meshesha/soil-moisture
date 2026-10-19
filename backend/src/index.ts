import app from './app';
import config from './config/env';
import { initDatabase, prisma } from './db';

const PORT = config.port;

// Start server
async function startServer() {
  try {
    await initDatabase();
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
