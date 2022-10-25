import { Router } from 'express';
import Controller from '../controllers/Teams.controller';

const router = Router();

router.get('/', Controller.getTeams);
router.get('/:id', Controller.getTeamsById);

export default router;
