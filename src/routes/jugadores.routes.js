import { Router } from 'express';
import * as controller from '../controllers/jugadores.controller.js';
import { apiKeyMiddleware, adminMiddleware } from '../middlewares/middleware.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

const router = Router();

router.post('/', apiKeyMiddleware, controller.createJugador);
router.get('/', apiKeyMiddleware, cacheMiddleware, controller.getAllJugadores);

router.get('/:id/stats', apiKeyMiddleware, cacheMiddleware, controller.getJugadorStats);
router.get('/:id/torneos', apiKeyMiddleware, cacheMiddleware, controller.getTorneosJugador);

router.put('/:id', apiKeyMiddleware, adminMiddleware, controller.updateJugador);
router.delete('/:id', apiKeyMiddleware, adminMiddleware, controller.deleteJugador);

export default router;
