/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../database';

export class TransactionRepository {
  // transaction = [];
  async saveTransaction(payerId: number, payeeId: number, value: number) {
    const transaction = await prisma.transaction.create({
      data: {
        value,
        payerId,
        payeeId,
      },
    });
    return transaction;
  }

  async findByTransactionId(transactionId: number) {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });
    return transaction;
  }
  async deleteTransaction(transactionId: number) {
    const transaction = await prisma.transaction.delete({
      where: { id: transactionId },
    });
    return null;
  }
}

export default new TransactionRepository();
