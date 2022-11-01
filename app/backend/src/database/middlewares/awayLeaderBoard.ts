import { IAwayMatch, ILeaderScore } from '../interfaces/ILeader';

const calculatingPoints = (matches: IAwayMatch[]) => {
  let points = 0;

  matches.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals < awayTeamGoals) {
      points += 3;
    }
    if (homeTeamGoals === awayTeamGoals) {
      points += 1;
    }
  });
  return points;
};

const calculatingVictories = (matches: IAwayMatch[]) => {
  let victories = 0;

  matches.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals < awayTeamGoals) {
      victories += 1;
    }
  });
  return victories;
};

const calculatingLosses = (matches: IAwayMatch[]) => {
  let losses = 0;

  matches.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      losses += 1;
    }
  });
  return losses;
};

const calculatingDraw = (matches: IAwayMatch[]) => {
  let draws = 0;

  matches.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals === awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

const calculatingGolsFavor = (matches: IAwayMatch[]) => {
  let gols = 0;

  matches.forEach((match) => {
    const { awayTeamGoals } = match;
    if (awayTeamGoals) {
      gols += awayTeamGoals;
    }
  });
  return gols;
};

const calculatingGolsContra = (matches: IAwayMatch[]) => {
  let gols = 0;

  matches.forEach((match) => {
    const { homeTeamGoals } = match;
    if (homeTeamGoals) {
      gols += homeTeamGoals;
    }
  });
  return gols;
};

const calculatingTotalScore = (matches: IAwayMatch[]) => {
  const homeGoals = calculatingGolsFavor(matches);
  const awayGoals = calculatingGolsContra(matches);

  const totalScore = homeGoals - awayGoals;
  return totalScore;
};

const calculatingVicPerc = (matches: IAwayMatch[]) => {
  const points = calculatingPoints(matches);
  const partidas = matches.length * 3;
  const victoryPercentage = points / partidas;

  if (!Number.isInteger(victoryPercentage * 100)) {
    return (victoryPercentage * 100).toFixed(2);
  }
  return victoryPercentage * 100;
};

const orderLeaderboard = async (leaderBoard: ILeaderScore[]) => {
  const result = leaderBoard.sort(
    (a, b) =>
      b.totalPoints - a.totalPoints
            || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
            || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn,
  );
  return result;
};

export {
  calculatingPoints,
  calculatingVictories,
  calculatingLosses,
  calculatingDraw,
  calculatingGolsFavor,
  calculatingGolsContra,
  calculatingTotalScore,
  calculatingVicPerc,
  orderLeaderboard,
};
