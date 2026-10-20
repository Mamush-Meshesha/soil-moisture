import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { initDatabase, prisma } from '../db';

describe('Dynamic Data & PostgreSQL Persistence Suite', () => {
  let createdProjectId: string;
  let createdProductSlug: string;
  let createdProductId: string;

  beforeAll(async () => {
    await initDatabase();
  }, 30000);

  describe('1. Dynamic Field Initiatives (/api/projects)', () => {
    it('GET /api/projects returns seeded initiatives with count', async () => {
      const res = await request(app).get('/api/projects');
      expect(res.status).toBe(200);
      expect(res.body.projects).toBeDefined();
      expect(Array.isArray(res.body.projects)).toBe(true);
      expect(res.body.projects.length).toBeGreaterThanOrEqual(1);
      expect(res.body.count).toBeGreaterThanOrEqual(1);
    });

    it('GET /api/projects?lang=am returns dynamic Amharic translations from translationsJson', async () => {
      const res = await request(app).get('/api/projects?lang=am');
      expect(res.status).toBe(200);
      expect(res.body.projects.length).toBeGreaterThanOrEqual(1);
      // The first seeded project should have Amharic title
      const p1 = res.body.projects[0];
      expect(p1.title).toBeDefined();
      expect(typeof p1.title).toBe('string');
      expect(p1.category).toBeDefined();
    });

    it('POST /api/projects creates a new field initiative in PostgreSQL', async () => {
      const payload = {
        title: 'Borena Drought Emergency Rapid Screening',
        slug: `borena-emergency-test-${Date.now()}`,
        categoryKey: 'field',
        category: 'Field Testing',
        date: 'October 2026',
        location: 'Borena Zone, Oromia, Ethiopia',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80',
        summary: 'Emergency field deployment of AquaScope rapid testing kits to verify rural borehole drinking water.',
        objective: 'Evaluate biological contamination across 40 pastoral wells.',
        method: 'Direct membrane filtration with 37C solar-incubated growth.',
        keyFindings: ['100% field kit operability without laboratory cold-chain', 'Identified 8 contaminated boreholes for immediate chlorination'],
        partner: 'UNICEF & Oromia Water Bureau',
        translations: {
          am: {
            title: 'የቦረና ድርቅ ድንገተኛ ፈጣን የውሃ ምርመራ',
            category: 'የመስክ ምርመራ',
            summary: 'በቦረና ዞን ለሚገኙ አርብቶ አደሮች የመጠጥ ውሃ ደህንነት ለማረጋገጥ የተደረገ የመስክ ምርመራ።',
          },
        },
      };

      const res = await request(app).post('/api/projects').send(payload);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.project).toBeDefined();
      expect(res.body.project.title).toBe(payload.title);
      expect(res.body.project.location).toBe(payload.location);

      createdProjectId = res.body.project.id;
    });

    it('GET /api/projects/:id returns single project with details', async () => {
      expect(createdProjectId).toBeDefined();
      const res = await request(app).get(`/api/projects/${createdProjectId}`);
      expect(res.status).toBe(200);
      expect(res.body.project.id).toBe(createdProjectId);
      expect(res.body.project.details.objective).toContain('pastoral wells');
    });

    it('PUT /api/projects/:id updates existing project in PostgreSQL', async () => {
      expect(createdProjectId).toBeDefined();
      const res = await request(app)
        .put(`/api/projects/${createdProjectId}`)
        .send({
          title: 'Borena Drought Emergency Rapid Screening (Updated)',
          location: 'Yabelo & Borena, Oromia, Ethiopia',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.project.title).toContain('(Updated)');
      expect(res.body.project.location).toContain('Yabelo');
    });

    it('DELETE /api/projects/:id deletes project from PostgreSQL', async () => {
      expect(createdProjectId).toBeDefined();
      const res = await request(app).delete(`/api/projects/${createdProjectId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify it no longer exists
      const verifyRes = await request(app).get(`/api/projects/${createdProjectId}`);
      expect(verifyRes.status).toBe(404);
    });
  });

  describe('2. Dynamic Store Products (/api/store/products)', () => {
    it('GET /api/store/products returns seeded water hardware products', async () => {
      const res = await request(app).get('/api/store/products');
      expect(res.status).toBe(200);
      expect(res.body.products).toBeDefined();
      expect(Array.isArray(res.body.products)).toBe(true);
      expect(res.body.products.length).toBeGreaterThanOrEqual(1);
    });

    it('POST /api/store/products creates a new product in PostgreSQL', async () => {
      const newProduct = {
        name: 'AquaScope Field Sterilization Unit',
        slug: `aquascope-sterilizer-${Date.now()}`,
        category: 'Equipment',
        price: 340.0,
        stockQty: 45,
        inStock: 1,
        imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1000&q=80',
        description: 'Compact UV and thermal sterilization station for re-using membrane filtration housings in field camps.',
        specs: {
          'Sterilization Cycle': '15 Minutes UV-C (254nm)',
          'Power Source': '12V DC / USB-C PD',
          'Weight': '1.2 kg',
        },
      };

      const res = await request(app).post('/api/store/products').send(newProduct);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.product).toBeDefined();
      expect(res.body.product.name).toBe(newProduct.name);
      expect(res.body.product.price).toBe(340);
      expect(res.body.product.stockQty).toBe(45);

      createdProductId = res.body.product.id;
      createdProductSlug = res.body.product.slug;
    });

    it('GET /api/store/products/:slug retrieves created product by slug', async () => {
      expect(createdProductSlug).toBeDefined();
      const res = await request(app).get(`/api/store/products/${createdProductSlug}`);
      expect(res.status).toBe(200);
      expect(res.body.product.slug).toBe(createdProductSlug);
      expect(res.body.product.specs['Sterilization Cycle']).toContain('15 Minutes');
    });

    it('PUT /api/store/products/:id updates price, stock and description', async () => {
      expect(createdProductId).toBeDefined();
      const res = await request(app)
        .put(`/api/store/products/${createdProductId}`)
        .send({
          price: 295.0,
          stockQty: 50,
          description: 'Updated field sterilizer unit description.',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.product.price).toBe(295);
      expect(res.body.product.stockQty).toBe(50);
    });

    it('DELETE /api/store/products/:id removes product from PostgreSQL', async () => {
      expect(createdProductId).toBeDefined();
      const res = await request(app).delete(`/api/store/products/${createdProductId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify deletion
      const checkRes = await request(app).get(`/api/store/products/${createdProductSlug}`);
      expect(checkRes.status).toBe(404);
    });
  });
});
