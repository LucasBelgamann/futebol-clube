import Teams from '../models/Teams.model';

export default class TeamsService {
  getTeams = () => {
    const getTeams = Teams.findAll();
    return getTeams;
  };

  getTeamsById = (id: number) => {
    const getTeamId = Teams.findByPk(id);
    return getTeamId;
  };
}
