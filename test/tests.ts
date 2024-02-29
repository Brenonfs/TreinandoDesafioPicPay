/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';
import request from 'supertest';
import { app } from '../src/app';
import {
  createUserCommon,
  createUserMerchant,
  createUserWithSameCPF,
  createUserWithSameEmail,
} from './utils/user/createUserTest';
import { loginUser } from './utils/user/loginUserTest';
import {
  createTransaction,
  createTransactionPayerIsMerchant,
  createTransactionPayerIsPayeeToo,
  createTransactionValueHigh,
} from './utils/transaction/createTransactionTest';

faker.locale = 'pt_BR';

const secretToken = process.env.SECRET_TOKEN;
if (!secretToken) {
  throw new Error('A variável de ambiente SECRET_TOKEN não está definida.');
}

describe('Test User', () => {
  it('Create User Common  ', async () => {
    const result = await createUserCommon(1);
    if (!result) {
      throw new Error('Erro na criação do User.');
    }
    const firstUser = result.users[0];
    expect(firstUser.response.body.result.name).toEqual(firstUser.name);
    expect(firstUser.response.body.result.email).toEqual(firstUser.email);
    expect(firstUser.response.body.result.cpf).toEqual(firstUser.cpf);
    expect(firstUser.response.body.result.balance).toEqual(firstUser.balance);
    expect(firstUser.response.body.result.userType).toEqual(firstUser.userType);
    expect(firstUser.response.statusCode).toEqual(200);
  }, 10000);
  it('Create User Common  ', async () => {
    const result = await createUserMerchant(1);
    if (!result) {
      throw new Error('Erro na criação da User.');
    }
    const firstUser = result.users[0];
    expect(firstUser.response.body.result.name).toEqual(firstUser.name);
    expect(firstUser.response.body.result.email).toEqual(firstUser.email);
    expect(firstUser.response.body.result.cpf).toEqual(firstUser.cpf);
    expect(firstUser.response.body.result.balance).toEqual(firstUser.balance);
    expect(firstUser.response.body.result.userType).toEqual(firstUser.userType);
    expect(firstUser.response.statusCode).toEqual(200);
  }, 10000);
  it('User login', async () => {
    const userTest = await createUserCommon(1);
    const loginResponse = await request(app).post('/session/').send({
      email: userTest.users[0].email,
      password: userTest.users[0].password,
    });
    const firstUser = userTest.users[0];
    expect(loginResponse.body.result.email).toEqual(firstUser.email);
    expect(loginResponse.statusCode).toEqual(200);
  }, 10000);
  it('View user', async () => {
    const userTest = await loginUser();

    const loginResponse = await request(app).get('/user/view').set('Authorization', `Bearer ${userTest.token}`).send({
      email: userTest.email,
      password: userTest.password,
    });

    expect(loginResponse.body.result.email).toEqual(userTest.email);
    expect(loginResponse.body.result.name).toEqual(userTest.name);
    expect(loginResponse.body.result.cpf).toEqual(userTest.cpf);
    expect(loginResponse.body.result.userType).toEqual(userTest.userType);
    expect(loginResponse.statusCode).toEqual(200);
  }, 10000);
  it('Error criar user com mesmo cpf ', async () => {
    const user = await createUserWithSameCPF(2);
    if (!user) {
      throw new Error('User Create ERROR: ');
    }
    const secondUser = user.users[1];
    expect(secondUser.response.body.message).toEqual('Este email ou CPF ja está em uso.');
    expect(secondUser.response.statusCode).toEqual(400);
  }, 10000);
  it('Error criar user com mesmo email ', async () => {
    const user = await createUserWithSameEmail(2);
    if (!user) {
      throw new Error('User Create ERROR: ');
    }
    const secondUser = user.users[1];
    expect(secondUser.response.body.message).toEqual('Este email ou CPF ja está em uso.');
    expect(secondUser.response.statusCode).toEqual(400);
  }, 10000);
});
describe('Test Transaction', () => {
  it('Create Transaction  ', async () => {
    const result = await createTransaction(1);
    if (!result) {
      throw new Error('Erro na criação da Transaction.');
    }
    const firstTransaction = result.transactions[0];
    expect(firstTransaction.response.body.result.createdTransaction.id).toEqual(firstTransaction.id);
    expect(firstTransaction.response.body.result.createdTransaction.value).toEqual(firstTransaction.value);
    expect(firstTransaction.response.body.result.createdTransaction.payerId).toEqual(firstTransaction.payer);
    expect(firstTransaction.response.body.result.createdTransaction.payeeId).toEqual(firstTransaction.payee);
    expect(firstTransaction.response.body.result.message).toEqual(firstTransaction.message);
    expect(firstTransaction.response.statusCode).toEqual(200);
  }, 10000);
  it('Error Trasanção saldo insuficiente ', async () => {
    const result = await createTransactionValueHigh(1);
    if (!result) {
      throw new Error('Transaction Create ERROR: ');
    }
    const firstTransaction = result.transactions[0];
    expect(firstTransaction.response.body.message).toEqual('Saldo insuficiente.');
    expect(firstTransaction.response.statusCode).toEqual(400);
  }, 10000);
  it('Error Trasanção Lojista não pode efetuar compra ', async () => {
    const result = await createTransactionPayerIsMerchant(1);
    if (!result) {
      throw new Error('Transaction Create ERROR: ');
    }
    const firstTransaction = result.transactions[0];
    expect(firstTransaction.response.body.message).toEqual('Lojista não pode efetuar pagamento.');
    expect(firstTransaction.response.statusCode).toEqual(400);
  }, 10000);
  it('list Transaction with Payer ', async () => {
    const result = await createTransaction(3);
    if (!result) {
      throw new Error('Erro na criação da Transaction.');
    }
    const loginResponse = await request(app).post('/session/').send({
      email: result.payer.email,
      password: result.payer.password,
    });
    const transactionList = await request(app)
      .get(`/transaction/list/`)
      .set('Authorization', `Bearer ${loginResponse.body.result.token}`);
    expect(transactionList.statusCode).toEqual(200);
    expect(transactionList.body.result).toBeTruthy();
    result.transactions.forEach((transactionTest) => {
      const isTransactionInList = transactionList.body.result.payerTransactions.some((transaction: any) => {
        return (
          transaction.value === transactionTest.value &&
          transaction.payerId === transactionTest.payer &&
          transaction.payeeId === transactionTest.payee &&
          transaction.id === transactionTest.id
        );
      });
      expect(isTransactionInList).toBeTruthy();
    });
    expect(transactionList.body.result.payeeTransactions).toHaveLength(0);
    expect(transactionList.body.result.payerTransactions).toHaveLength(3);
  }, 10000);
  it('list Transaction  with Payee', async () => {
    const result = await createTransactionPayerIsPayeeToo(3);
    if (!result) {
      throw new Error('Erro na criação da Transaction.');
    }
    const loginResponse = await request(app).post('/session/').send({
      email: result.payee.email,
      password: result.payee.password,
    });
    const transactionList = await request(app)
      .get(`/transaction/list/`)
      .set('Authorization', `Bearer ${loginResponse.body.result.token}`);
    expect(transactionList.statusCode).toEqual(200);
    expect(transactionList.body.result).toBeTruthy();

    result.transactions.forEach((transactionTest) => {
      const isTransactionInList = transactionList.body.result.payeeTransactions.some((transaction: any) => {
        return (
          transaction.value === transactionTest.value &&
          transaction.payerId === transactionTest.payer &&
          transaction.payeeId === transactionTest.payee &&
          transaction.id === transactionTest.id
        );
      });
      expect(isTransactionInList).toBeTruthy();
    });
    expect(transactionList.body.result.payeeTransactions).toHaveLength(3);
    expect(transactionList.body.result.payerTransactions).toHaveLength(0);
  }, 10000);
  it('view Transaction  ', async () => {
    const result = await createTransaction(1);
    if (!result) {
      throw new Error('Erro na criação da Transaction.');
    }
    const loginResponse = await request(app).post('/session/').send({
      email: result.payer.email,
      password: result.payer.password,
    });
    const response = await request(app)
      .get(`/transaction/view/${result.transactions[0].id}`)
      .set('Authorization', `Bearer ${loginResponse.body.result.token}`);
    expect(response.body.result.value).toEqual(result.transactions[0].value);
    expect(response.body.result.payerId).toEqual(result.transactions[0].payer);
    expect(response.body.result.payeeId).toEqual(result.transactions[0].payee);

    expect(response.statusCode).toEqual(200);
  }, 10000);
});
