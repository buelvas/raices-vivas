import { Router } from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { signToken, authenticate } from '../auth.js';

const router = Router();
const SALT_ROUNDS = 10;

// Helpers
function setAuthCookie(res, token) {
  const secure = (process.env.COOKIE_SECURE === 'true');
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    maxAge: 2 * 60 * 60 * 1000 // 2h
  });
}

// --- Validators ---
const registerValidators = [
  body('email').isEmail().withMessage('Correo inválido'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
  body('name').optional().isLength({ min: 2 }).withMessage('Nombre muy corto'),
  body('phone').optional().isLength({ min: 5 }).withMessage('Teléfono inválido'),
  body('city').optional().isLength({ min: 2 }).withMessage('Ciudad inválida'),
  body('country').optional().isLength({ min: 2 }).withMessage('País inválido'),
  body('role').optional().isString().isLength({ min: 3 }).withMessage('Rol inválido'),
  body('terms').optional().isBoolean().withMessage('Términos inválidos')
];

router.post('/register', registerValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, name, phone, city, country, role, terms } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash, name, phone, city, country, role, terms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      email,
      password_hash,
      name || null,
      phone || null,
      city || null,
      country || null,
      role || null,
      terms ? 1 : 0
    );
    return res.status(201).json({ message: 'Registro exitoso' });
  } catch (err) {
    if (String(err).includes('UNIQUE')) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Error en el registro' });
  }
});

router.post('/login',
  body('email').isEmail().withMessage('Correo inválido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      if (!row) return res.status(401).json({ error: 'Credenciales inválidas' });

      const ok = await bcrypt.compare(password, row.password_hash);
      if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

      // Update started_at on each successful login
      const startedAt = new Date().toISOString();
      db.prepare('UPDATE users SET started_at = ? WHERE id = ?').run(startedAt, row.id);

      const token = signToken({ id: row.id, email: row.email });
      setAuthCookie(res, token);

      return res.json({ message: 'Login exitoso', startedAt });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en autenticación' });
    }
  }
);

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Sesión cerrada' });
});

router.get('/me', authenticate, (req, res) => {
  const { id } = req.user;
  const row = db.prepare(`
    SELECT id, email, name, phone, city, country, role, terms, started_at AS startedAt, created_at
    FROM users WHERE id = ?
  `).get(id);

  // Normaliza booleano
  if (row && typeof row.terms !== 'undefined') {
    row.terms = !!row.terms;
  }

  return res.json({ user: row });
});

export default router;
