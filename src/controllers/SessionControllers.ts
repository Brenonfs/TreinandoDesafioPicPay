import { Request, Response } from 'express';
import { BadRequestError } from '../helpers/api-erros';
import { sessionUserSchema } from '../schemas/session';
import { UserSessionService } from '../service/SessionService/userSession.service';

export class SessionController {
  private userSessionService: UserSessionService;

  constructor() {
    this.userSessionService = new UserSessionService();
  }

  sessionUser = async (req: Request, res: Response) => {
    const validatedSessionSchema = sessionUserSchema.safeParse(req.body);
    if (!validatedSessionSchema.success) {
      throw new BadRequestError(`Não foi possível fazer o login.`);
    }

    const result = await this.userSessionService.execute(
      validatedSessionSchema.data.email,
      validatedSessionSchema.data.password,
    );

    res.json({ result });
  };
}
