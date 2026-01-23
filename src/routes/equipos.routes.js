import { Router } from 'express';
import * as controller from '../controllers/equipos.controller.js';
import { apiKeyMiddleware, adminMiddleware } from '../middlewares/middleware.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

const router = Router();

router.post('/', apiKeyMiddleware, controller.createEquipo);
router.get('/ranking', apiKeyMiddleware, cacheMiddleware, controller.rankingEquipos);
router.get('/', apiKeyMiddleware, cacheMiddleware, controller.getAllEquipos);
router.get('/:id', apiKeyMiddleware, cacheMiddleware, controller.getEquipo);

router.put('/:id', apiKeyMiddleware, adminMiddleware, controller.updateEquipo);
router.delete('/:id', apiKeyMiddleware, adminMiddleware, controller.deleteEquipo);

export default router;
