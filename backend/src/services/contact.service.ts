import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';
import { db } from '../db';

export class ContactService {
  async submitInquiry(data: any) {
    const { name, email, phone, farmSize, interest, message } = data;
    if (!name || !email || !message) {
      const err: any = new Error('Name, email, and message are required fields.');
      err.statusCode = 400;
      throw err;
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

    return {
      success: true,
      inquiryId,
      message: 'Thank you for reaching out. A [Platform Name] agricultural specialist will contact you shortly.',
    };
  }
}

export const contactService = new ContactService();
export default contactService;
