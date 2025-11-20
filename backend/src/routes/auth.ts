import { Router } from 'express';
import crypto from 'crypto';

interface User {
  id: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
}

const users = new Map<string, User>();
const router = Router();

router.post('/signup', (req, res) => {
  const { email, password, role } = req.body || {};
  if (!email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
  if (users.has(email)) return res.status(409).json({ error: 'Email exists' });
  const user: User = { id: crypto.randomUUID(), email, password, role };
  users.set(email, user);
  const token = 'demo-' + crypto.randomUUID();
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const user = users.get(email);
  if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
  const token = 'demo-' + crypto.randomUUID();
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

export default router;