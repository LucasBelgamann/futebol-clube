import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MachesController {
  getMatches = (_req: Request, res: Response) => {
    const matches = MatchesService.getAllMatches();
    return res.status(200).json(matches);
  };

  getProgressTrue = (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = MatchesService.getAllMatches({ where: { inProgress: true } });
      return res.status(200).json(matches);
    }
    const matches = MatchesService.getAllMatches({ where: { inProgress: false } });
    return res.status(200).json(matches);
  };
}

export default new MachesController();
