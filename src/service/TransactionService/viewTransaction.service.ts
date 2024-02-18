import { NotFoundError, UnauthorizedError } from '../../helpers/api-erros';
import { TransactionRepository } from '../../repositories/transaction.repository';

class ViewTransactionService {
  private transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async execute(userId: number, transactionId: number) {
    const transactionExist = await this.transactionRepository.findByTransactionId(transactionId);
    if (!transactionExist) {
      throw new NotFoundError(`Não foi possível encontrar transação com essas especificações.`);
    }
    if (transactionExist.payeeId !== userId && transactionExist.payerId !== userId) {
      throw new UnauthorizedError(`Essa transação não pertence a este usuário.`);
    }
    return transactionExist;
  }
}
export { ViewTransactionService };
