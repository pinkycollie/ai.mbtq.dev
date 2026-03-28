import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { sql } from '../../lib/db.js';
import { verifyPassword, hashPassword } from '../middleware/auth.js';
import { z } from 'zod';
import crypto from 'crypto';
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = authSchema.extend({ name: z.string().optional() }).parse(req.body);
        // Check if user exists
        const existingUser = await sql `SELECT * FROM users WHERE email = ${email}`;
        if (existingUser[0]) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const userId = crypto.randomUUID();
        await sql `
      INSERT INTO users (id, email, password_hash, name, created_at)
      VALUES (${userId}, ${email}, ${hashedPassword}, ${name || null}, NOW())
    `;
        // Award welcome bonus
        await sql `INSERT INTO user_tokens (user_id, balance, created_at, updated_at) VALUES (${userId}, 25, NOW(), NOW())`;
        const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, userId });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.flatten() });
        }
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = authSchema.parse(req.body);
        const user = await sql `SELECT * FROM users WHERE email = ${email}`;
        if (!user[0]) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isValid = await verifyPassword(password, user[0].password_hash);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user[0].id, email: user[0].email }, JWT_SECRET, { expiresIn: '24h' });
        // Update last login
        await sql `UPDATE users SET last_login = NOW() WHERE id = ${user[0].id}`;
        res.json({ token, userId: user[0].id, name: user[0].name });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.flatten() });
        }
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default router;
//# sourceMappingURL=auth.js.map