import { Router } from 'express';
import { userRoutes } from './user.routes';
import { transactionRoutes } from './transaction.routes';
import { sessionRoutes } from './session.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/transaction', transactionRoutes);
router.use('/session', sessionRoutes);
export { router };
