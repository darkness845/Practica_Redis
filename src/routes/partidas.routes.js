import { Router } from 'express';
import * as controller from '../controllers/partidas.controller.js';
import { apiKeyMiddleware, adminMiddleware } from '../middlewares/middleware.js';

const router = Router();

router.post('/', apiKeyMiddleware, controller.createPartida);
router.get('/:id', apiKeyMiddleware, controller.getPartida);
router.get('/torneo/:torneoId', apiKeyMiddleware, controller.getPartidasByTorneo);

router.put('/:id/resultado', apiKeyMiddleware, adminMiddleware, controller.registrarResultado);

export default router;
