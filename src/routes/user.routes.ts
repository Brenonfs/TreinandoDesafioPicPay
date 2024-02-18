import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/', userController.create);
userRoutes.get('/view', ensureAuth, userController.view);

export { userRoutes };
