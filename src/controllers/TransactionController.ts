/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { BadRequestError, UnauthorizedError } from '../helpers/api-erros';
import { transactionCreateSchema } from '../schemas/transaction';
import { CreateTransactionService } from '../service/TransactionService/createTransaction.service';
import { ViewTransactionService } from '../service/TransactionService/viewTransaction.service';
import { ListTransactionService } from '../service/TransactionService/listTransaction.service';

export class TransactionController {
  private viewTransactionService: ViewTransactionService;
  private createTransactionService: CreateTransactionService;
  private listTransactionService: ListTransactionService;

  constructor() {
    this.viewTransactionService = new ViewTransactionService();
    this.createTransactionService = new CreateTransactionService();
    this.listTransactionService = new ListTransactionService();
  }

  create = async (req: Request, res: Response) => {
    const validatedtransactionSchema = transactionCreateSchema.safeParse(req.body);
    if (!validatedtransactionSchema.success) {
      throw new BadRequestError(`Não foi possível fazer a transição.`);
    }

    const result = await this.createTransactionService.execute(
      validatedtransactionSchema.data.payer,
      validatedtransactionSchema.data.payee,
      validatedtransactionSchema.data.value,
    );

    return res.json({
      result,
    });
  };

  list = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    if (userId === undefined) {
      throw new UnauthorizedError('Usuário não está autenticado.');
    }

    const result = await this.listTransactionService.execute(userId);
    return res.json({
      result,
    });
  };

  view = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    if (userId === undefined) {
      throw new UnauthorizedError('Usuário não está autenticado.');
    }
    const transactionId = +req.params.id;
    const result = await this.viewTransactionService.execute(userId, transactionId);
    return res.json({
      result,
    });
  };
}
