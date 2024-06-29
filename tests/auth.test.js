const request = require('supertest');
const { v4 } = require('uuid');
const app = require('../app');

describe('Auth APIs', () => {
  let id = v4()
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser'+id,
      password: 'password123',
      role: 'admin'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login the user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser'+id,
      password: 'password123'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should logout a user', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      username: 'testuser'+id,
      password: 'password123',
    });
    const token = loginRes.body.token;

    const res = await request(app).post('/api/auth/logout').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logout successful');
  });
});
