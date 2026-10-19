/**
 * Ensure BigInt and Prisma Decimal values serialize cleanly to JSON numbers
 */

// Patch BigInt serialization
(BigInt.prototype as any).toJSON = function () {
  const intVal = Number(this);
  return Number.isSafeInteger(intVal) ? intVal : this.toString();
};

// Patch Prisma Decimal serialization if present
try {
  const runtime = require('@prisma/client/runtime/library');
  if (runtime?.Decimal?.prototype) {
    runtime.Decimal.prototype.toJSON = function () {
      return this.toNumber();
    };
  }
} catch (_) {}

export function isDecimal(val: any): boolean {
  return (
    val !== null &&
    typeof val === 'object' &&
    (typeof val.toNumber === 'function' ||
      (Array.isArray(val.d) && typeof val.s === 'number' && typeof val.e === 'number'))
  );
}

export function serializeDbValues<T>(obj: T): T {
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
