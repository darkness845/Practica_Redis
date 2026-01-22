import { Router } from 'express';
import * as controller from '../controllers/equipos.controller.js';

const router = Router();

router.post('/', controller.createEquipo);
router.get('/ranking', controller.rankingEquipos);
router.get('/', controller.getAllEquipos);
router.get('/:id', controller.getEquipo);
router.put('/:id', controller.updateEquipo);
router.delete('/:id', controller.deleteEquipo);


export default router;
