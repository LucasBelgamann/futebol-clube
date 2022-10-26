import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MachesController {
  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await MatchesService.getAllMatches({ where: { inProgress: true } });
      return res.status(200).json(matches);
    }
    const matches = await MatchesService.getAllMatches({ where: { inProgress: false } });
    return res.status(200).json(matches);
  };

  createNewMatches = async (req: Request, res: Response) => {
    const matchBody = req.body;
    const newMatch = await MatchesService.createNewMatch(matchBody);
    return res.status(201).json(newMatch);
  };
}

export default new MachesController();
