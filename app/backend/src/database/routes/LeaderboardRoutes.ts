import { Router } from 'express';
import LeaderBoard from '../controllers/LeaderBoard.controller';

const router = Router();

const leaderBoard = new LeaderBoard();

router.get('/', leaderBoard.leaderboardAll);
router.get('/home', leaderBoard.leaderHome);
router.get('/away', leaderBoard.leaderAway);

export default router;
