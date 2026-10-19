import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { AuthRequest, authenticate, JWT_SECRET } from '../middleware/auth';

const router = Router();

router.post('/register', async (req, res: Response) => {
  try {
    const { email, password, fullName, organizationName, role } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Email, password, and full name are required.' });
    }

    const existing = await db.get('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existing) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = uuidv4();
    const assignedRole = role || 'FARM_MANAGER';
    const org = organizationName || 'My Farm';

    await db.run(
      `INSERT INTO users (id, email, password_hash, full_name, role, organization_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, email.toLowerCase().trim(), passwordHash, fullName.trim(), assignedRole, org.trim()]
    );

    const token = jwt.sign(
      { id: userId, email: email.toLowerCase().trim(), fullName, role: assignedRole, organizationName: org },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      user: { id: userId, email: email.toLowerCase().trim(), fullName, role: assignedRole, organizationName: org },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

router.post('/login', async (req, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await db.get<{
      id: string;
      email: string;
      password_hash: string;
      full_name: string;
      role: string;
      organization_name: string;
    }>('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        organizationName: user.organization_name,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        organizationName: user.organization_name,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await db.get<{
      id: string;
      email: string;
      full_name: string;
      role: string;
      organization_name: string;
      created_at: string;
    }>('SELECT id, email, full_name, role, organization_name, created_at FROM users WHERE id = ?', [req.user!.id]);

    if (!user) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    return res.json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve user profile.' });
  }
});

export default router;
