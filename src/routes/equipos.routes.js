import { Router } from 'express';
import * as controller from '../controllers/equipos.controller.js';
import { apiKeyMiddleware, adminMiddleware } from '../middlewares/middleware.js';

const router = Router();

router.post('/', apiKeyMiddleware, controller.createEquipo);
router.get('/ranking', apiKeyMiddleware, controller.rankingEquipos);
router.get('/', apiKeyMiddleware, controller.getAllEquipos);
router.get('/:id', apiKeyMiddleware, controller.getEquipo);

router.put('/:id', apiKeyMiddleware, adminMiddleware, controller.updateEquipo);
router.delete('/:id', apiKeyMiddleware, adminMiddleware, controller.deleteEquipo);

export default router;
