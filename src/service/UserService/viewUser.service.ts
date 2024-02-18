import { NotFoundError } from '../../helpers/api-erros';
import { UserRepository } from '../../repositories/user.repository';

export class ViewUserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(userId: number) {
    const userExist = await this.userRepository.findById(userId);
    if (!userExist) {
      throw new NotFoundError(`Usuário não encontrado.`);
    }
    return userExist;
  }
}
