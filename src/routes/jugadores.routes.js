import { Router } from 'express';
import * as controller from '../controllers/jugadores.controller.js';

const router = Router();

router.post('/', controller.createJugador);
router.get('/', controller.getAllJugadores);

router.get('/:id/stats', controller.getJugadorStats);
router.get('/:id/torneos', controller.getTorneosJugador);

router.put('/:id', controller.updateJugador);
router.delete('/:id', controller.deleteJugador);

export default router;
