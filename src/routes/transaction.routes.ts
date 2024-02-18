import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth';
import { TransactionController } from '../controllers/TransactionController';

const transactionRoutes = Router();

const transactionController = new TransactionController();

transactionRoutes.post('/', transactionController.create);
transactionRoutes.get('/view/id:', ensureAuth, transactionController.view);
transactionRoutes.get('/list', ensureAuth, transactionController.list);

export { transactionRoutes };
