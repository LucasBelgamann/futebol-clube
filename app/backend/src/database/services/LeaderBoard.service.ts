import LeaderboardAway from './AwayLeaderBoard.service';
import LeaderboardHome from './HomeLeaderBoard.service';
import { percentualEffi } from '../middlewares/homeLeaderboard';
import { orderLeaderboard } from '../middlewares/awayLeaderBoard';

class LeaderBoard {
  leaderBoardHome: LeaderboardHome;
  leaderBoardAway: LeaderboardAway;

  constructor() {
    this.leaderBoardHome = new LeaderboardHome();
    this.leaderBoardAway = new LeaderboardAway();
  }

  winner = async () => {
    const home = await this.leaderBoardHome.leaderboardHome();
    const away = await this.leaderBoardAway.leaderboardAway();
    const result = home.filter((e, i) => home[i].name).map((element, index) => ({
      name: element.name,
      totalPoints: element.totalPoints + away[index].totalPoints,
      totalGames: element.totalGames + away[index].totalGames,
      totalVictories: element.totalVictories + away[index].totalVictories,
      totalDraws: element.totalDraws + away[index].totalDraws,
      totalLosses: element.totalLosses + away[index].totalLosses,
      goalsFavor: element.goalsFavor + away[index].goalsFavor,
      goalsOwn: element.goalsOwn + away[index].goalsOwn,
      goalsBalance: element.goalsBalance + away[index].goalsBalance,
      efficiency: percentualEffi(
        element.totalPoints + away[index].totalPoints,
        element.totalGames + away[index].totalGames,
      ),
    }));
    return result;
  };

  sortLeaderboard = async () => {
    const leaderboard = await this.winner();
    const result = await orderLeaderboard(leaderboard);
    return result;
  };
}

export default LeaderBoard;
