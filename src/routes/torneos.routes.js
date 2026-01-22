import { Router } from 'express';
import * as controller from '../controllers/torneos.controller.js';

const router = Router();

router.post('/', controller.createTorneo);
router.put('/:torneoId', controller.updateTorneo);
router.post('/:torneoId/equipos', controller.asignarEquipos);
router.post('/:torneoId/estado', controller.cambiarEstado);
router.get('/', controller.getTorneos);
router.get('/:torneoId/equipos', controller.getEquiposDeTorneo);

export default router;
