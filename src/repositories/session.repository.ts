import { prisma } from '../database';

export class SessionRepository {
  users = [];
  async findByEmail(email: string) {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    return userExists;
  }
}
