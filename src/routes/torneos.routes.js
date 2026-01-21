import { Router } from 'express';
import * as controller from '../controllers/torneos.controller.js';

const router = Router();

router.post('/', controller.createTorneo);
router.post('/:torneoId/equipos', controller.asignarEquipos);
router.post('/:torneoId/estado', controller.cambiarEstado);

export default router;
