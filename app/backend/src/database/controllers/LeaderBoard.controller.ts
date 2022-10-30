import { Request, Response, NextFunction } from 'express';
import LeaderboardHome from '../services/HomeLeaderBoard.service';

class LeaderboardController {
  leaderboard: LeaderboardHome;

  constructor() {
    this.leaderboard = new LeaderboardHome();
  }

  LeaderHome = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const ranking = await this.leaderboard.sortLeaderboardHome();

      if (!ranking) return res.status(404).json();

      return res.status(200).json(ranking);
    } catch (e) {
      return res.status(500).end();
    }
  };
}

export default LeaderboardController;
