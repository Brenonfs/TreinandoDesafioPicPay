import { app } from '../../../src/app';
import request from 'supertest';
import { createUserCommon } from './createUserTest';

export async function loginUser() {
  const userTest = await createUserCommon(1);
  const loginResponse = await request(app).post('/session/').send({
    email: userTest.users[0].email,
    password: userTest.users[0].password,
  });
  userTest.users[0].token = loginResponse.body.result.token;
  return userTest.users[0];
}
