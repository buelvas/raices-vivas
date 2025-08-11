import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET = 'dev_secret' } = process.env;

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '2h' });
}

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const cookieToken = req.cookies?.token;
    const token = bearer || cookieToken;
    if (!token) return res.status(401).json({ error: 'No autorizado'});
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Sesión inválida o expirada' });
  }
}
