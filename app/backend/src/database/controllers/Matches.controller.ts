import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MachesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.matchesService.getAllMatches({ where: { inProgress: true } });
      return res.status(200).json(matches);
    }
    const matches = await this.matchesService.getAllMatches({ where: { inProgress: false } });
    return res.status(200).json(matches);
  };

  createNewMatches = async (req: Request, res: Response) => {
    const matchBody = req.body;

    const newMatch = await this.matchesService.createNewMatch(matchBody);

    return res.status(201).json(newMatch);
  };

  updateId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message } = await this.matchesService.updateId(Number(id));
    return res.status(200).json(message);
  };
}

export default new MachesController();
