import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/health', async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };

  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = JSON.stringify(error);
    res.status(503).send();
  }
});

export { router as healthCheckRoutes };