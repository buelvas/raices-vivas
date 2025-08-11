import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../src/routes/auth.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

describe('Auth flow', () => {
  const rnd = Math.floor(Math.random() * 1e9);
  const email = `user${rnd}@test.com`;
  const pwd = 'SuperSecret1!';

  it('registers a user', async () => {
    const res = await request(app).post('/api/auth/register').send({ email, password: pwd, name: 'Test' });
    expect([200,201]).toContain(res.statusCode);
  });

  it('logs in and returns cookie', async () => {
    const res = await request(app).post('/api/auth/login').send({ email, password: pwd });
    expect(res.statusCode).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();
  });
});
