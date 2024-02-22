import { app } from '../../../src/app';
import request from 'supertest';
import faker from 'faker';
import { ITransactionTest } from '../../interfaces/Transaction';
import { createUserCommon, createUserMerchant } from '../user/createUserTest';

export async function createTransaction(numberOfTransactions: number) {
  const payer = await createUserCommon(1);
  if (!payer || !payer.users[0].id) {
    return null;
  }
  const payee = await createUserMerchant(1);
  if (!payee || !payee.users[0].id) {
    return null;
  }

  const transactions = [];
  for (let i = 0; i < numberOfTransactions; i++) {
    const value = faker.random.number({ min: 1, max: 99 });
    const id = null;
    const response = null;
    const message = null;

    const transactionTest: ITransactionTest = {
      id,
      value,
      payer: payer.users[0].id,
      payee: payee.users[0].id,
      response,
      message,
    };
    const result = await request(app).post('/transaction').send({
      value,
      payer: payer.users[0].id,
      payee: payee.users[0].id,
    });
    transactionTest.message = result.body.result.message;
    transactionTest.id = result.body.result.createdTransaction.id;
    transactionTest.response = result;
    transactions.push(transactionTest);
  }
  return { transactions, payer: payer.users[0], payee: payee.users[0] };
}
export async function createTransactionPayerIsPayeeToo(numberOfTransactions: number) {
  const payer = await createUserCommon(1);
  if (!payer || !payer.users[0].id) {
    return null;
  }
  const payee = await createUserCommon(1);
  if (!payee || !payee.users[0].id) {
    return null;
  }

  const transactions = [];
  for (let i = 0; i < numberOfTransactions; i++) {
    const value = faker.random.number({ min: 1, max: 99 });
    const id = null;
    const response = null;
    const message = null;

    const transactionTest: ITransactionTest = {
      id,
      value,
      payer: payer.users[0].id,
      payee: payee.users[0].id,
      response,
      message,
    };
    const result = await request(app).post('/transaction').send({
      value,
      payer: payer.users[0].id,
      payee: payee.users[0].id,
    });
    transactionTest.message = result.body.result.message;
    transactionTest.id = result.body.result.createdTransaction.id;
    transactionTest.response = result;
    transactions.push(transactionTest);
  }
  return { transactions, payer: payer.users[0], payee: payee.users[0] };
}
export async function createTransactionValueHigh(numberOfTransactions: number) {
  const payer = await createUserCommon(1);
  if (!payer || !payer.users[0].id) {
    return null;
  }
  const payee = await createUserMerchant(1);
  if (!payee || !payee.users[0].id) {
    return null;
  }

  const transactions = [];
  for (let i = 0; i < numberOfTransactions; i++) {
    const value = faker.random.number({ min: 1001, max: 2002 });
    const id = null;
    const response = null;
    const message = null;
    const transactionTest: ITransactionTest = {
      id,
      value,
      payer: payer.users[0].id,
      payee: payee.users[0].id,
      response,
      message,
    };
    const result = await request(app).post('/transaction').send({
      value,
      payer: payer.users[0].id,
      payee: payee.users[0].id,
    });
    transactionTest.response = result;
    transactions.push(transactionTest);
  }
  return { transactions };
}
export async function createTransactionPayerIsMerchant(numberOfTransactions: number) {
  const payeeOne = await createUserMerchant(1);
  if (!payeeOne || !payeeOne.users[0].id) {
    return null;
  }
  const payeeTwo = await createUserMerchant(1);
  if (!payeeTwo || !payeeTwo.users[0].id) {
    return null;
  }
  const transactions = [];
  for (let i = 0; i < numberOfTransactions; i++) {
    const value = faker.random.number({ min: 1, max: 99 });
    const id = null;
    const response = null;
    const message = null;

    const transactionTest: ITransactionTest = {
      id,
      value,
      payer: payeeOne.users[0].id,
      payee: payeeTwo.users[0].id,
      response,
      message,
    };
    const result = await request(app).post('/transaction').send({
      value,
      payer: payeeOne.users[0].id,
      payee: payeeTwo.users[0].id,
    });

    transactionTest.response = result;
    transactions.push(transactionTest);
  }
  return { transactions };
}
