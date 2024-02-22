import faker from 'faker';
import { app } from '../../../src/app';
import request from 'supertest';
import { IUserTest } from '../../interfaces/UserTest';

export async function createUserCommon(numberOfCommons: number) {
  const users = [];
  for (let i = 0; i < numberOfCommons; i++) {
    const name = faker.name.findName();
    const cpf = faker.random.number({ min: 10000000000, max: 99999999999 }).toString();
    const balance = parseFloat(faker.finance.amount(100, 1000, 2));
    const password = faker.random.number({ min: 100, max: 500 }).toString();
    const email = faker.internet.email();
    const id = null;
    const userType = 'common';
    const response = null;
    const token = null;

    const userTest: IUserTest = {
      id,
      name,
      email,
      cpf,
      password,
      balance,
      userType,
      response,
      token,
    };
    const result = await request(app).post('/user').send({
      name,
      email,
      cpf,
      password,
      balance,
      userType,
    });
    userTest.id = result.body.result.id;
    userTest.response = result;

    users.push(userTest);
  }
  return { users };
}
export async function createUserMerchant(numberOfCommons: number) {
  const users = [];
  for (let i = 0; i < numberOfCommons; i++) {
    const name = faker.name.findName();
    const cpf = faker.random.number({ min: 10000000000, max: 99999999999 }).toString();
    const balance = parseFloat(faker.finance.amount(100, 1000, 2));
    const password = faker.random.number({ min: 100, max: 500 }).toString();
    const email = faker.internet.email();
    const id = null;
    const userType = 'merchant';
    const response = null;
    const token = null;

    const userTest: IUserTest = {
      id,
      name,
      email,
      cpf,
      password,
      balance,
      userType,
      response,
      token,
    };
    const result = await request(app).post('/user').send({
      name,
      email,
      cpf,
      password,
      balance,
      userType,
    });

    userTest.id = result.body.result.id;
    userTest.response = result;

    users.push(userTest);
  }
  return { users };
}

export async function createUserWithSameCPF(numberOfCommons: number) {
  const users = [];
  const cpf = faker.random.number({ min: 10000000000, max: 99999999999 }).toString();
  for (let i = 0; i < numberOfCommons; i++) {
    const name = faker.name.findName();
    const balance = parseFloat(faker.finance.amount(100, 1000, 2));
    const password = faker.random.number({ min: 100, max: 500 }).toString();
    const email = faker.internet.email();
    const id = null;
    const userType = 'common';
    const response = null;
    const token = null;

    const userTest: IUserTest = {
      id,
      name,
      email,
      cpf,
      password,
      balance,
      userType,
      response,
      token,
    };
    const result = await request(app).post('/user').send({
      name,
      email,
      cpf,
      password,
      balance,
      userType,
    });
    userTest.response = result;

    users.push(userTest);
  }
  return { users };
}
export async function createUserWithSameEmail(numberOfCommons: number) {
  const users = [];
  const email = faker.internet.email();
  for (let i = 0; i < numberOfCommons; i++) {
    const name = faker.name.findName();
    const cpf = faker.random.number({ min: 10000000000, max: 99999999999 }).toString();
    const balance = parseFloat(faker.finance.amount(100, 1000, 2));
    const password = faker.random.number({ min: 100, max: 500 }).toString();

    const id = null;
    const userType = 'common';
    const response = null;
    const token = null;

    const userTest: IUserTest = {
      id,
      name,
      email,
      cpf,
      password,
      balance,
      userType,
      response,
      token,
    };
    const result = await request(app).post('/user').send({
      name,
      email,
      cpf,
      password,
      balance,
      userType,
    });
    userTest.response = result;

    users.push(userTest);
  }
  return { users };
}
