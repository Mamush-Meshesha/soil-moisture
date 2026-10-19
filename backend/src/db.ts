import prisma from './prisma';

export { prisma };

// Ensure BigInt (returned by PostgreSQL COUNT(*) etc.) serializes cleanly in JSON
(BigInt.prototype as any).toJSON = function () {
  const intVal = Number(this);
  return Number.isSafeInteger(intVal) ? intVal : this.toString();
};

// Try configuring Decimal.prototype.toJSON if available
try {
  const runtime = require('@prisma/client/runtime/library');
  if (runtime?.Decimal?.prototype) {
    runtime.Decimal.prototype.toJSON = function () {
      return this.toNumber();
    };
  }
} catch (_) {}

function isDecimal(val: any): boolean {
  return (
    val !== null &&
    typeof val === 'object' &&
    (typeof val.toNumber === 'function' ||
      (Array.isArray(val.d) && typeof val.s === 'number' && typeof val.e === 'number'))
  );
}

function serializeDbValues<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'bigint') {
    const intVal = Number(obj);
    return (Number.isSafeInteger(intVal) ? intVal : obj.toString()) as any;
  }

  if (isDecimal(obj)) {
    return (typeof (obj as any).toNumber === 'function'
      ? (obj as any).toNumber()
      : Number(obj.toString?.() || String(obj))) as any;
  }

  if (Array.isArray(obj)) return obj.map(serializeDbValues) as any;

  if (typeof obj === 'object' && !(obj instanceof Date)) {
    const res: any = {};
    for (const key of Object.keys(obj as any)) {
      res[key] = serializeDbValues((obj as any)[key]);
    }
    return res;
  }

  return obj;
}

/**
 * Transforms SQLite-flavored SQL queries into PostgreSQL syntax:
 * 1. Converts ? placeholders to $1, $2, $3...
 * 2. Converts SQLite datetime('now', ...) to PostgreSQL (NOW() +/- INTERVAL '...')
 * 3. Converts strftime('%H', col) to TO_CHAR(col, 'HH24')
 * 4. Casts AVG() inside ROUND() to ::numeric for PostgreSQL compliance
 * 5. Handles INSERT OR IGNORE / INSERT OR REPLACE
 */
export function transformSql(sql: string): string {
  let transformed = sql;

  // 1. Convert datetime('now', '-X units') / datetime('now', '+X units')
  transformed = transformed.replace(
    /datetime\(\s*'now'\s*,\s*'-(\d+)\s*(hours?|days?|minutes?|seconds?)'\s*\)/gi,
    "((NOW() AT TIME ZONE 'UTC') - INTERVAL '$1 $2')"
  );
  transformed = transformed.replace(
    /datetime\(\s*'now'\s*,\s*'\+(\d+)\s*(hours?|days?|minutes?|seconds?)'\s*\)/gi,
    "((NOW() AT TIME ZONE 'UTC') + INTERVAL '$1 $2')"
  );
  transformed = transformed.replace(/datetime\(\s*'now'\s*\)/gi, "(NOW() AT TIME ZONE 'UTC')");

  // 2. Convert strftime('%H', measured_at)
  transformed = transformed.replace(/strftime\(\s*'%H'\s*,\s*([^)]+)\)/gi, "TO_CHAR($1, 'HH24')");

  // 3. PostgreSQL ROUND(double precision, int) requires numeric cast: ROUND((expr)::numeric, scale)
  transformed = transformed.replace(
    /ROUND\(\s*([^,]+?)\s*,\s*(\d+)\s*\)/gi,
    'ROUND(($1)::numeric, $2)'
  );

  // 4. Handle INSERT OR IGNORE / INSERT OR REPLACE for specific tables
  if (/INSERT\s+OR\s+IGNORE\s+INTO\s+sensor_readings/i.test(transformed)) {
    transformed = transformed.replace(
      /INSERT\s+OR\s+IGNORE\s+INTO\s+sensor_readings/gi,
      'INSERT INTO sensor_readings'
    );
    transformed += ' ON CONFLICT (device_id, depth_cm, measured_at) DO NOTHING';
  }

  if (/INSERT\s+OR\s+REPLACE\s+INTO\s+idempotency_keys/i.test(transformed)) {
    transformed = transformed.replace(
      /INSERT\s+OR\s+REPLACE\s+INTO\s+idempotency_keys\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/gi,
      'INSERT INTO idempotency_keys ($1) VALUES ($2) ON CONFLICT (key) DO UPDATE SET response_json = EXCLUDED.response_json'
    );
  }

  // 5. Convert ? to $1, $2, $3...
  let paramIndex = 1;
  transformed = transformed.replace(/\?/g, () => `$${paramIndex++}`);

  return transformed;
}

// Format parameter values for PostgreSQL
function formatParams(params: any[] = []): any[] {
  return params.map((p) => {
    if (p instanceof Date) return p;
    // Normalize date strings if they match ISO timestamp
    if (typeof p === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(p)) {
      return new Date(p);
    }
    return p;
  });
}

// Database interface
export const db = {
  async run(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
    const query = transformSql(sql);
    const formattedParams = formatParams(params);
    const changes = await prisma.$executeRawUnsafe(query, ...formattedParams);
    return { lastID: 0, changes };
  },

  async get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
    const query = transformSql(sql);
    const formattedParams = formatParams(params);
    const rows = (await prisma.$queryRawUnsafe(query, ...formattedParams)) as any[];
    if (!rows || rows.length === 0) return undefined;
    return serializeDbValues(rows[0]) as T;
  },

  async all<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const query = transformSql(sql);
    const formattedParams = formatParams(params);
    const rows = (await prisma.$queryRawUnsafe(query, ...formattedParams)) as any[];
    return serializeDbValues(rows || []) as T[];
  },

  async exec(sql: string): Promise<void> {
    await prisma.$executeRawUnsafe(sql);
  },
};

export async function initDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL database via Prisma ORM.');
  } catch (err: any) {
    console.error('Failed to connect to PostgreSQL database:', err.message);
    throw err;
  }
}
