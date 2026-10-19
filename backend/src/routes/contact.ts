import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';

const router = Router();

// POST /api/contact - Submit contact inquiry or demo request
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, farmSize, interest, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const inquiryId = uuidv4();
    await db.run(
      `INSERT INTO contact_inquiries (id, name, email, phone, farm_size, interest, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        inquiryId,
        name.trim(),
        email.trim().toLowerCase(),
        phone ? phone.trim() : null,
        farmSize || null,
        interest || 'General Platform Demo',
        message.trim(),
      ]
    );

    return res.status(201).json({
      success: true,
      inquiryId,
      message: 'Thank you for reaching out. A [Platform Name] agricultural specialist will contact you shortly.',
    });
  } catch (error: any) {
    console.error('Contact inquiry error:', error);
    return res.status(500).json({ error: 'Failed to record your inquiry. Please try again later.' });
  }
});

export default router;
