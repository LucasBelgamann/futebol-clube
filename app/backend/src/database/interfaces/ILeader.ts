interface IHomeMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome: {
    teamName: string;
  }
}

export default IHomeMatch;
