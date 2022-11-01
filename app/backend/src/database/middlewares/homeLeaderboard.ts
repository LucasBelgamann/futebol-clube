import { IHomeMatch } from '../interfaces/ILeader';

const calculatingPoints = (matches: IHomeMatch[]) => {
  let points = 0;

  matches.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      points += 3;
    }
    if (homeTeamGoals === awayTeamGoals) {
      points += 1;
    }
  });
  return points;
};

const calculatingVictories = (matches: IHomeMatch[]) => {
  let victories = 0;

  matches.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      victories += 1;
    }
  });
  return victories;
};

const calculatingLosses = (matches: IHomeMatch[]) => {
  let losses = 0;

  matches.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals < awayTeamGoals) {
      losses += 1;
    }
  });
  return losses;
};

const calculatingDraw = (matches: IHomeMatch[]) => {
  let draws = 0;

  matches.forEach((match) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals === awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

const calculatingGolsFavor = (matches: IHomeMatch[]) => {
  let gols = 0;

  matches.forEach((match) => {
    const { homeTeamGoals } = match;
    if (homeTeamGoals) gols += homeTeamGoals;
  });
  return gols;
};

const calculatingGolsContra = (matches: IHomeMatch[]) => {
  let gols = 0;

  matches.forEach((match) => {
    const { awayTeamGoals } = match;
    if (awayTeamGoals) {
      gols += awayTeamGoals;
    }
  });
  return gols;
};

const calculatingTotalScore = (matches: IHomeMatch[]) => {
  const homeGoals = calculatingGolsFavor(matches);
  const awayGoals = calculatingGolsContra(matches);

  const totalScore = homeGoals - awayGoals;
  return totalScore;
};

const calculatingVicPerc = (matches: IHomeMatch[]) => {
  const points = calculatingPoints(matches);
  const matchess = matches.length * 3;
  const victoryPercentage = points / matchess;

  if (!Number.isInteger(victoryPercentage * 100)) {
    return (victoryPercentage * 100).toFixed(2);
  }
  return (victoryPercentage * 100);
};

const percentualEffi = (p: number, g: number) => Number(((p / (g * 3)) * 100).toFixed(2));

export {
  calculatingPoints,
  calculatingVictories,
  calculatingLosses,
  calculatingDraw,
  calculatingGolsFavor,
  calculatingGolsContra,
  calculatingTotalScore,
  calculatingVicPerc,
  percentualEffi,
};
