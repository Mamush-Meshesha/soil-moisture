#!/bin/sh
set -e

echo "[Platform Name] Backend initializing..."

# Run migrations if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
  echo "Applying database migrations via Prisma..."
  npx prisma migrate deploy || true

  if [ "$SEED_ON_START" = "true" ]; then
    echo "Seeding initial platform database..."
    node -e "require('./dist/seed.js').seedDatabase().catch(err => console.error(err))" || npm run seed || true
  fi
fi

echo "Launching application: $@"
exec "$@"
