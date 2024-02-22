import { hash } from 'bcryptjs';
import { prisma } from '../database';

export class UserRepository {
  // users = [];
  async saveUser(name: string, email: string, cpf: string, password: string, balance: number, userType: string) {
    const hashedPassword = await hash(password, 8);
    const user = await prisma.user.create({
      data: { name, email, cpf, password: hashedPassword, balance, userType },
      select: { id: true, name: true, email: true, cpf: true, balance: true, userType: true },
    });

    return user;
  }
  async findById(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { name: true, email: true, cpf: true, balance: true, userType: true },
    });
    return user;
  }
  async findByEmail(email: string) {
    const userExist = await prisma.user.findUnique({
      where: { email },
    });
    return userExist;
  }
  async findByCPF(cpf: string) {
    const userExist = await prisma.user.findUnique({
      where: { cpf },
    });
    return userExist;
  }
  async findByIdForTransaction(userId: number) {
    const transaction = await prisma.user.findUnique({
      where: { id: userId },
      select: { payerTransactions: true, payeeTransactions: true },
    });
    return transaction;
  }
  async updateBalance(id: number, balance: number) {
    const userExist = await prisma.user.update({
      where: { id },
      data: { balance },
      select: { name: true, email: true, cpf: true, balance: true, userType: true },
    });
    return userExist;
  }
}

export default new UserRepository();
