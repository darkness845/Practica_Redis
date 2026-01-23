import { Router } from 'express';
import * as controller from '../controllers/torneos.controller.js';
import { apiKeyMiddleware, adminMiddleware } from '../middlewares/middleware.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

const router = Router();

router.post('/', apiKeyMiddleware, controller.createTorneo);
router.get('/', apiKeyMiddleware, cacheMiddleware, controller.getTorneos);
router.get('/:torneoId/equipos', apiKeyMiddleware, cacheMiddleware, controller.getEquiposDeTorneo);

router.put('/:torneoId', apiKeyMiddleware, adminMiddleware, controller.updateTorneo);
router.post('/:torneoId/equipos', apiKeyMiddleware, adminMiddleware, controller.asignarEquipos);
router.post('/:torneoId/estado', apiKeyMiddleware, adminMiddleware, controller.cambiarEstado);

export default router;
