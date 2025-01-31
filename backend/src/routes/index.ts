import { Router } from 'express';
import { articleRoutes } from './article.routes';

const router = Router();

router.use('/articles', articleRoutes);

export { router as apiRoutes };