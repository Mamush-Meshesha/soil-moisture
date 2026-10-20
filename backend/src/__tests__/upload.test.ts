import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { initDatabase } from '../db';

describe('Cloudinary Image Upload Suite', () => {
  beforeAll(async () => {
    await initDatabase();
  }, 30000);

  it('POST /api/upload rejects request when image is missing', async () => {
    const res = await request(app).post('/api/upload').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Image data is required');
  });

  it('POST /api/upload uploads a valid base64 image to Cloudinary and returns secure URL', async () => {
    // 1x1 transparent PNG data URI
    const sampleBase64 =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

    const res = await request(app)
      .post('/api/upload')
      .send({
        image: sampleBase64,
        folder: 'aquascope/test',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.url).toBeDefined();
    expect(res.body.url).toContain('cloudinary.com');
    expect(res.body.publicId).toBeDefined();
  }, 30000);
});
