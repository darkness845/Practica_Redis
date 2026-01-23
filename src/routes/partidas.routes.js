import { Router } from 'express';
import * as controller from '../controllers/partidas.controller.js';
import { apiKeyMiddleware, adminMiddleware } from '../middlewares/middleware.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

const router = Router();

router.post('/', apiKeyMiddleware, controller.createPartida);
router.get('/torneo/:torneoId', apiKeyMiddleware, cacheMiddleware, controller.getPartidasByTorneo);
router.get('/:id', apiKeyMiddleware, cacheMiddleware, controller.getPartida);

router.put('/:id/resultado', apiKeyMiddleware, adminMiddleware, controller.registrarResultado);

export default router;
