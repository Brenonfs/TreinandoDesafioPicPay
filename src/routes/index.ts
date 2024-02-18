import { Router } from 'express';
import { userRoutes } from './user.routes';
import { transactionRoutes } from './transaction.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/transaction', transactionRoutes);
export { router };
