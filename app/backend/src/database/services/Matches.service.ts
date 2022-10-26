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
}

export default new MatchesService();
