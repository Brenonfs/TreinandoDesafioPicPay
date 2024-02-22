import { Router } from 'express';

import { SessionController } from '../controllers/SessionControllers';

const sessionRoutes = Router();

const sessionController = new SessionController();

sessionRoutes.post('/', sessionController.sessionUser);

export { sessionRoutes };
