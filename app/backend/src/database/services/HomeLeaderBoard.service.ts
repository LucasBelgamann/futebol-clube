import {
  calculatingPoints,
  calculatingVictories,
  calculatingLosses,
  calculatingDraw,
  calculatingGolsFavor,
  calculatingGolsContra,
  calculatingTotalScore,
  calculatingVicPerc,
} from '../middlewares/homeLeaderboard';

import getAllTeams from './Teams.service';
import Matches from '../models/Matches.model';
import Teams from '../models/Teams.model';
import { IHomeMatch } from '../interfaces/ILeader';
import { orderLeaderboard } from '../middlewares/awayLeaderBoard';

class HomeLeader {
  findAllHomeTeamMatches = async () => {
    const result = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: {
            exclude: ['id'],
          },
        },
      ],
      where: {
        inProgress: false,
      },
    });
    return result as unknown as IHomeMatch[];
  };

  leaderboardHome = async () => {
    const homeTeams = await getAllTeams();
    const homeTeamMatches = await this.findAllHomeTeamMatches();
    const matchMap = homeTeams.map((e) => {
      const home = homeTeamMatches.filter((match) => match.teamHome.teamName === e.teamName);
      return {
        name: e.teamName,
        totalPoints: calculatingPoints(home),
        totalGames: home.length,
        totalVictories: calculatingVictories(home),
        totalDraws: calculatingDraw(home),
        totalLosses: calculatingLosses(home),
        goalsFavor: calculatingGolsFavor(home),
        goalsOwn: calculatingGolsContra(home),
        goalsBalance: calculatingTotalScore(home),
        efficiency: calculatingVicPerc(home),
      };
    });
    return matchMap;
  };

  orderLeaderboardHome = async () => {
    const leaderboard = await this.leaderboardHome();
    const result = await orderLeaderboard(leaderboard);
    return result;
  };
}

export default HomeLeader;
