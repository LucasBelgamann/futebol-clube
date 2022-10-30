import {
  calculatingPoints,
  calculatingVictories,
  calculatingLosses,
  calculatingDraw,
  calculatingGolsFavor,
  calculatingGolsContra,
  calculatingTotalScore,
  calculatingVicPerc,
  orderLeaderboard,
} from '../middlewares/awayLeaderBoard';

import getAllTeams from './Teams.service';
import Matches from '../models/Matches.model';
import Teams from '../models/Teams.model';
import { IAwayMatch } from '../interfaces/ILeader';

class LeaderboardAway {
  getAllAwayTeamMatches = async () => {
    const result = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamAway',
          attributes: {
            exclude: ['id'],
          },
        },
      ],
      where: {
        inProgress: false,
      },
    });
    return result as unknown as IAwayMatch[];
  };

  leaderboardAway = async () => {
    const awayTeams = await getAllTeams();
    const awayTeamMatches = await this.getAllAwayTeamMatches();
    const matchMap = awayTeams.map((e) => {
      const away = awayTeamMatches.filter((match) => match.teamAway.teamName === e.teamName);
      return {
        name: e.teamName,
        totalPoints: calculatingPoints(away),
        totalGames: away.length,
        totalVictories: calculatingVictories(away),
        totalDraws: calculatingLosses(away),
        totalLosses: calculatingDraw(away),
        goalsFavor: calculatingGolsFavor(away),
        goalsOwn: calculatingGolsContra(away),
        goalsBalance: calculatingTotalScore(away),
        efficiency: calculatingVicPerc(away),
      };
    });
    return matchMap;
  };

  orderLeaderboardAway = async () => {
    const leaderBoard = await this.leaderboardAway();
    const result = await orderLeaderboard(leaderBoard);
    return result;
  };
}

export default LeaderboardAway;
