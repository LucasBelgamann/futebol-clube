import { Router } from 'express';
import Controller from '../controllers/Matches.controller';

const router = Router();

router.get('/', Controller.getMatches);
router.get('/', Controller.getProgressTrue);

export default router;
