const request = require('supertest');
const app = require('../app');
const { v4 } = require('uuid');

describe('User APIs', () => {
  let token;
  beforeAll(async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'tewari.divyanshu17',
      password: '123456'
    });
    token = res.body.token;
  });

  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').set('Authorization', `Bearer ${token}`).send({
      username: 'rikhtam-test-user'+v4(),
      password: 'newpassword',
      role: 'user'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  it('should edit a user', async () => {
    const userId = '667f08dcdbb3a1af84f128cb';
    const res = await request(app).put(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`).send({
      username: 'editeduser'+v4()
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated successfully');
  });
});
