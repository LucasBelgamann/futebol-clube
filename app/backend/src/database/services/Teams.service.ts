import Teams from '../models/Teams.model';

const getAllTeams = () => {
  const teams = Teams.findAll();
  return teams;
};

export default getAllTeams;
