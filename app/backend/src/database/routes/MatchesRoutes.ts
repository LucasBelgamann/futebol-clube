import { Router } from 'express';
import Controller from '../controllers/Matches.controller';
import authenticationMatches from '../middlewares/validateCreateMatches';

const router = Router();

router.get('/', Controller.getMatches);
router.post('/', authenticationMatches, Controller.createNewMatches);
router.patch('/:id/finish', Controller.updateId);
router.patch('/:id', Controller.updateById);

export default router;
