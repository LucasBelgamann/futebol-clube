interface IHomeMatch {
  homeTeam: number;
  teamName: string;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome: {
    teamName: string;
  }
}

interface IAwayMatch {
  homeTeam: number;
  teamName: string;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamAway: {
    teamName: string;
  };
}

interface ILeaderScore {
  totalPoints: number;
  totalVictories: number;
  goalsBalance: number;
  goalsFavor: number;
  goalsOwn: number;
}

export {
  IHomeMatch,
  IAwayMatch,
  ILeaderScore,
};
