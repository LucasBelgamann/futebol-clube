import Teams from '../models/Teams.model';
import Matches from '../models/Matches.model';
import { IInProgress } from '../types/IInProgress';

class MatchesService {
  getAllMatches = <T>(inProgress?: IInProgress<T>): Promise<Matches[] | []> => {
    const matches = Matches.findAll({
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
}

export default new MatchesService();
