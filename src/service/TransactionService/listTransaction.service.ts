import { NotFoundError } from '../../helpers/api-erros';
import { UserRepository } from '../../repositories/user.repository';

class ListTransactionService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(userId: number) {
    const transactionExist = await this.userRepository.findByIdForTransaction(userId);
    if (!transactionExist) {
      throw new NotFoundError(`Não foi possível encontrar transações.`);
    }
    return transactionExist;
  }
}
export { ListTransactionService };
