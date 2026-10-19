import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { db, initDatabase } from '../db';
import { seedDatabase } from '../seed';

describe('[Platform Name] Backend API Suite', () => {
  beforeAll(async () => {
    await initDatabase();
  }, 30000);

  describe('Health Endpoint', () => {
    it('GET /api/health returns 200 with platform info', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.platform).toContain('[Platform Name]');
    });
  });

  describe('Authentication & RBAC', () => {
    it('POST /api/auth/login succeeds with seeded credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'farmer@example.com',
        password: 'AgriPass2026!',
      });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('farmer@example.com');
      expect(res.body.user.role).toBe('FARM_MANAGER');
    });

    it('POST /api/auth/login rejects invalid credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'farmer@example.com',
        password: 'WrongPassword123!',
      });

      expect(res.status).toBe(401);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('Farms and Fields', () => {
    let token: string;

    beforeAll(async () => {
      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'farmer@example.com',
        password: 'AgriPass2026!',
      });
      token = loginRes.body.token;
    });

    it('GET /api/farms returns seeded farms', async () => {
      const res = await request(app)
        .get('/api/farms')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.farms)).toBe(true);
      expect(res.body.farms.length).toBeGreaterThanOrEqual(2);
      expect(res.body.farms[0].name).toBeDefined();
    });

    it('GET /api/fields returns seeded fields', async () => {
      const res = await request(app)
        .get('/api/fields')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.fields)).toBe(true);
      expect(res.body.fields.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Telemetry Ingestion & Idempotency', () => {
    it('POST /api/telemetry/ingest accepts sensor reading and prevents duplicates', async () => {
      const idempotencyKey = `test-idemp-${Date.now()}`;
      const payload = {
        deviceUid: 'TS-PROBE-88219',
        source: 'SENSOR',
        batteryMv: 3850,
        signalRssi: -65,
        readings: [
          {
            depthCm: 10,
            vwcPercent: 27.5,
            tempC: 21.0,
            ecDsM: 1.18,
            qualityScore: 1.0,
            measuredAt: new Date().toISOString(),
          },
        ],
      };

      // First ingestion attempt
      const res1 = await request(app)
        .post('/api/telemetry/ingest')
        .set('X-Idempotency-Key', idempotencyKey)
        .send(payload);

      expect(res1.status).toBe(200);
      expect(res1.body.success).toBe(true);
      expect(res1.body.insertedCount).toBe(1);

      // Second ingestion attempt with same key (should return cached response)
      const res2 = await request(app)
        .post('/api/telemetry/ingest')
        .set('X-Idempotency-Key', idempotencyKey)
        .send(payload);

      expect(res2.status).toBe(200);
      expect(res2.body.insertedCount).toBe(1);
    });
  });

  describe('Hardware Catalog & Store Sandbox Checkout', () => {
    it('GET /api/store/products returns catalog items', async () => {
      const res = await request(app).get('/api/store/products');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.products)).toBe(true);
      expect(res.body.products.length).toBeGreaterThanOrEqual(5);
    });

    it('POST /api/store/checkout creates confirmed order in test sandbox', async () => {
      const orderPayload = {
        customerEmail: 'test.buyer@example.com',
        customerName: '[Sample Customer]',
        shippingAddress: {
          street: '[123 Agricultural Way]',
          city: '[Sample City]',
          state: 'TS',
          zip: '12345',
          country: 'USA',
        },
        items: [
          {
            productId: 'prod-01',
            name: '[Platform Name] Probe X5 Multi-Depth',
            price: 480.0,
            quantity: 2,
          },
        ],
        totalAmount: 960.0,
      };

      const res = await request(app).post('/api/store/checkout').send(orderPayload);
      expect(res.status).toBe(201);
      expect(res.body.order.id).toBeDefined();
      expect(res.body.paymentMode).toBe('SANDBOX_TEST_INTEGRATION');
    });
  });

  describe('Devices & Hardware Management', () => {
    let token: string;

    beforeAll(async () => {
      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'farmer@example.com',
        password: 'AgriPass2026!',
      });
      token = loginRes.body.token;
    });

    it('GET /api/devices returns list of registered hardware probes and gateways', async () => {
      const res = await request(app)
        .get('/api/devices')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.devices)).toBe(true);
      expect(res.body.devices.length).toBeGreaterThanOrEqual(4);
      expect(res.body.devices[0].device_uid).toBeDefined();
    });

    it('GET /api/devices/:id returns device details with recent telemetry', async () => {
      const res = await request(app)
        .get('/api/devices/dev-probe-01')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.device.id).toBe('dev-probe-01');
      expect(Array.isArray(res.body.recentReadings)).toBe(true);
      expect(Array.isArray(res.body.maintenance)).toBe(true);
    });
  });

  describe('Alerts & Notifications', () => {
    let token: string;

    beforeAll(async () => {
      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'farmer@example.com',
        password: 'AgriPass2026!',
      });
      token = loginRes.body.token;
    });

    it('GET /api/alerts returns active and historical agronomic alerts', async () => {
      const res = await request(app)
        .get('/api/alerts')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.alerts)).toBe(true);
      expect(res.body.alerts.length).toBeGreaterThanOrEqual(1);
    });

    it('PUT /api/alerts/:id/acknowledge acknowledges active alert', async () => {
      const res = await request(app)
        .put('/api/alerts/alt-active-01/acknowledge')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.alert.status).toBe('ACKNOWLEDGED');
    });
  });

  describe('Irrigation Planning & Advisory', () => {
    let token: string;

    beforeAll(async () => {
      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'farmer@example.com',
        password: 'AgriPass2026!',
      });
      token = loginRes.body.token;
    });

    it('GET /api/irrigation/events returns logged irrigation runs', async () => {
      const res = await request(app)
        .get('/api/irrigation/events')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.events)).toBe(true);
      expect(res.body.events.length).toBeGreaterThanOrEqual(2);
    });

    it('GET /api/irrigation/guidance calculates water deficit index', async () => {
      const res = await request(app)
        .get('/api/irrigation/guidance')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.guidance)).toBe(true);
      expect(res.body.guidance.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Telemetry Analytics & Agronomic Reports', () => {
    let token: string;

    beforeAll(async () => {
      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'farmer@example.com',
        password: 'AgriPass2026!',
      });
      token = loginRes.body.token;
    });

    it('GET /api/telemetry/history returns multi-depth time series', async () => {
      const res = await request(app)
        .get('/api/telemetry/history?fieldId=fld-corn-alpha')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.readings)).toBe(true);
      expect(res.body.readings.length).toBeGreaterThanOrEqual(10);
    });

    it('GET /api/telemetry/analytics returns diurnal transpiration cycle and summary stats', async () => {
      const res = await request(app)
        .get('/api/telemetry/analytics?fieldId=fld-corn-alpha')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.diurnalCycle)).toBe(true);
      expect(Array.isArray(res.body.summaryStats)).toBe(true);
    });

    it('GET /api/reports/summary returns overall platform metrics', async () => {
      const res = await request(app)
        .get('/api/reports/summary')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.metrics.totalFarms).toBeGreaterThanOrEqual(2);
      expect(res.body.metrics.totalFields).toBeGreaterThanOrEqual(4);
    });
  });
});
