import { Router } from 'express';
import * as controller from '../controllers/jugadores.controller.js';
import { apiKeyMiddleware, adminMiddleware } from '../middlewares/middleware.js';

const router = Router();

router.post('/', apiKeyMiddleware, controller.createJugador);
router.get('/', apiKeyMiddleware, controller.getAllJugadores);

router.get('/:id/stats', apiKeyMiddleware, controller.getJugadorStats);
router.get('/:id/torneos', apiKeyMiddleware, controller.getTorneosJugador);

router.put('/:id', apiKeyMiddleware, adminMiddleware, controller.updateJugador);
router.delete('/:id', apiKeyMiddleware, adminMiddleware, controller.deleteJugador);

export default router;
