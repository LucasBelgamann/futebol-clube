import Teams from '../models/Teams.model';
import Matches from '../models/Matches.model';
import { IInProgress } from '../types/IInProgress';

class MatchesService {
  getAllMatches = async <T>(inProgress?: IInProgress<T>): Promise<Matches[] | []> => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
      ...inProgress,
    });
    return matches;
  };

  createNewMatch = async (match: Matches) => {
    const createMatch = await Matches.create({ ...match, inProgress: true });
    return createMatch;
  };

  updateId = async (id: number) => {
    await Matches.update({ inProgress: false }, { where: { id } });
    const message = { message: 'Finished' };
    return message;
  };

  getById = async (ids: number[]) => {
    const error = {
      status: 404,
      message: 'There is no team with such id!',
    };
    const teams = await Promise.all(ids.map((id) => Teams.findOne({ where: { id } })));

    const verifyInvalidTeam = teams.some((team) => !team);

    if (verifyInvalidTeam) return error;

    return teams;
  };
}

export default MatchesService;
