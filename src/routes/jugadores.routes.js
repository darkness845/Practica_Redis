import { Router } from 'express';
import * as controller from '../controllers/jugadores.controller.js';

const router = Router();

router.post('/', controller.createJugador);
router.get('/', controller.getAllJugadores);

export default router;
