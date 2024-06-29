const request = require('supertest');
const { v4 } = require('uuid');
const Group = require('../models/Group')
const app = require('../app');

describe('Group APIs', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'tewari.divyanshu17',
      password: '123456'
    });
    token = res.body.token;
  });

  it('should create a new group', async () => {
    const res = await request(app).post('/api/groups').set('Authorization', `Bearer ${token}`).send({
      name: 'testgroup'+v4()
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Group created successfully');
  });

  it('should search groups', async () => {
    const res = await request(app).get('/api/groups?query=test').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a member to a group', async () => {
    const group = new Group({ name: 'Member Group'+v4() });
    const userId = '667e4f82cef984dd293505b2'
    await group.save();
    const res = await request(app)
      .put(`/api/groups/${group._id}/members/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Member added successfully');
  });

  it('should delete a group', async () => {
    const group = new Group({ name: 'Member Group'+v4() });
    await group.save();
    const res = await request(app)
      .delete(`/api/groups/${group._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Group deleted successfully');
  });
});
