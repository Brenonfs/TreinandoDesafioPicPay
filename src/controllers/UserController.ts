/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { BadRequestError, UnauthorizedError } from '../helpers/api-erros';
import { userCreateSchema } from '../schemas/user';
import { CreateUserService } from '../service/UserService/createUser.service';
import { ViewUserService } from '../service/UserService/viewUser.service';

export class UserController {
  private createUserService: CreateUserService;
  private viewUserService: ViewUserService;

  constructor() {
    this.createUserService = new CreateUserService();
    this.viewUserService = new ViewUserService();
  }

  create = async (req: Request, res: Response) => {
    const validatedUserSchema = userCreateSchema.safeParse(req.body);
    if (!validatedUserSchema.success) {
      throw new BadRequestError(`Não foi possível criar usuário.`);
    }

    const result = await this.createUserService.execute(
      validatedUserSchema.data.name,
      validatedUserSchema.data.email,
      validatedUserSchema.data.cpf,
      validatedUserSchema.data.password,
      validatedUserSchema.data.balance,
      validatedUserSchema.data.userType,
    );
    return res.json({
      result,
    });
  };

  view = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    if (userId === undefined) {
      throw new UnauthorizedError('Usuário não está autenticado.');
    }

    const result = await this.viewUserService.execute(userId);

    return res.json({
      result,
    });
  };
}
