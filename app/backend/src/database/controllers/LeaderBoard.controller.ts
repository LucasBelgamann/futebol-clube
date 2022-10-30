import { Request, Response } from 'express';
import LeaderboardHome from '../services/HomeLeaderBoard.service';
import LeaderboardAway from '../services/AwayLeaderBoard.service';
import Leaderboard from '../services/LeaderBoard.service';

class LeaderboardController {
  leaderboardHome: LeaderboardHome;
  leaderboardAway: LeaderboardAway;
  leaderboard: Leaderboard;

  constructor() {
    this.leaderboardHome = new LeaderboardHome();
    this.leaderboardAway = new LeaderboardAway();
    this.leaderboard = new Leaderboard();
  }

  leaderHome = async (_req: Request, res: Response) => {
    try {
      const scoreboard = await this.leaderboardHome.orderLeaderboardHome();

      if (!scoreboard) return res.status(404).json();

      return res.status(200).json(scoreboard);
    } catch (error) {
      return res.status(500).end();
    }
  };

  leaderAway = async (_req: Request, res: Response) => {
    try {
      const scoreboard = await this.leaderboardAway.orderLeaderboardAway();

      if (!scoreboard) return res.status(404).json();

      return res.status(200).json(scoreboard);
    } catch (error) {
      return res.status(500).end();
    }
  };

  leaderboardAll = async (_req: Request, res: Response) => {
    try {
      const scoreboard = await this.leaderboard.sortLeaderboard();

      if (!scoreboard) return res.status(404).json();

      return res.status(200).json(scoreboard);
    } catch (e) {
      return res.status(500).end();
    }
  };
}

export default LeaderboardController;
