import { BadRequestError, NotFoundError, UnauthorizedError } from '../../helpers/api-erros';
import { TransactionRepository } from '../../repositories/transaction.repository';
import { UserRepository } from '../../repositories/user.repository';
import axios from 'axios';

class CreateTransactionService {
  private userRepository: UserRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.transactionRepository = new TransactionRepository();
  }

  async execute(payerId: number, payeeId: number, value: number) {
    const payerExists = await this.userRepository.findById(payerId);
    const payeeExists = await this.userRepository.findById(payeeId);
    if (!payerExists) {
      throw new BadRequestError(`O comum não está cadastrada.`);
    }
    if (!payeeExists) {
      throw new BadRequestError(`O logista não está cadastrada.`);
    }
    if (payerExists.userType === 'merchant') {
      throw new BadRequestError(`Lojista não pode efetuar pagamento.`); // verificar
    }
    if (value > payerExists.balance) {
      throw new BadRequestError(`Saldo insuficiente.`); // verificar
    }
    const autorization = await axios.get(`https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc`);
    if (autorization.data.message !== 'Autorizado') {
      throw new UnauthorizedError(`Transição não autorizada.`);
    }
    const balancePayer = payerExists.balance - value;
    const balancePayee = payeeExists.balance + value;
    const createdTransaction = await this.transactionRepository.saveTransaction(payerId, payeeId, value);
    if (!createdTransaction) {
      throw new NotFoundError(`Não foi possível criar usuário com essas especificações.`);
    }
    const updatePayer = await this.userRepository.updateBalance(payerId, balancePayer);
    if (!updatePayer) {
      const deletTransaction = await this.transactionRepository.deleteTransaction(createdTransaction.id);
      if (!deletTransaction) {
        throw new NotFoundError(`Não foi possível deletar a transição após dar erro ao atualizar o logistar.`);
      }

      throw new NotFoundError(`Não foi possível atualizar o usuário com essas especificações.`);
    }
    const updatePayee = await this.userRepository.updateBalance(payeeId, balancePayee);
    if (!updatePayee) {
      const deletTransaction = await this.transactionRepository.deleteTransaction(createdTransaction.id);
      if (!deletTransaction) {
        throw new NotFoundError(`Não foi possível deletar a transição após dar erro ao atualizar o usuário.`);
      }
      throw new NotFoundError(`Não foi possível atualizar o lojista com essas especificações.`);
    }
    const notification = await axios.get(`https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6`);
    let message;
    if (notification.data.message !== true) {
      message = `sistema de notificação fora do ar`;
    } else {
      message = `Pagamento realizado`;
    }
    return { createdTransaction, message };
  }
}
export { CreateTransactionService };
