import { Router } from 'express';
import * as controller from '../controllers/partidas.controller.js';

const router = Router();

router.post('/', controller.createPartida);
router.patch('/:id/resultado', controller.registrarResultado);
router.get('/torneo/:torneoId', controller.getPartidasByTorneo);

export default router;
