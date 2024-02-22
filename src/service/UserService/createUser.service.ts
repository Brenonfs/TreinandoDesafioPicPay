import { BadRequestError, NotFoundError } from '../../helpers/api-erros';
import { UserRepository } from '../../repositories/user.repository';

class CreateUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(name: string, email: string, cpf: string, password: string, balance: number, userType: string) {
    const userExistsEmail = await this.userRepository.findByEmail(email);
    const userExistsCPF = await this.userRepository.findByCPF(cpf);
    if (userExistsEmail) {
      throw new BadRequestError(`Este email ou CPF ja está em uso.`);
    }
    if (userExistsCPF) {
      throw new BadRequestError(`Este email ou CPF ja está em uso.`);
    }

    const createdUser = await this.userRepository.saveUser(name, email, cpf, password, balance, userType);
    if (!createdUser) {
      throw new NotFoundError(`Não foi possível criar usuário com essas especificações.`);
    }
    return createdUser;
  }
}
export { CreateUserService };
