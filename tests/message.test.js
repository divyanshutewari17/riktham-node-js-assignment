const request = require('supertest');
const app = require('../app');

describe('Message APIs', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'tewari.divyanshu17',
      password: '123456'
    });
    token = res.body.token;
  });

  it('should send a message in a group', async () => {
    const groupId = '667f031094d8363407a1d817'; 
    const res = await request(app).post('/api/messages').set('Authorization', `Bearer ${token}`).send({
      groupId,
      text: 'Hello, group!'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Message sent successfully');
  });

  it('should like a message', async () => {
    const messageId = '667f07edfc2cabd322a143c6'; 
    const res = await request(app).put(`/api/messages/${messageId}/like`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Message liked successfully');
  });
});
