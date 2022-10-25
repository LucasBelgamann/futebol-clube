import { Request, Response } from 'express';
import Matches from '../models/Matches.model';
import Teams from '../models/Teams.model';

class MachesController {
  getMatches = (_req: Request, res: Response) => {
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
    });
    return res.status(200).json(matches);
  };
}

export default new MachesController();
