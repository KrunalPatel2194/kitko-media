import { Router } from 'express';
import { articleRoutes } from './article.routes';
import { healthCheckRoutes } from './healthcheck.routes';

const router = Router();

router.use('/articles', articleRoutes);
router.use('/health', healthCheckRoutes);


export { router as apiRoutes };