import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MachesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const matches = await this.matchesService.getAllMatches({ where: { inProgress: true } });
      return res.status(200).json(matches);
    }
    if (inProgress === 'false') {
      const matches = await this.matchesService.getAllMatches({ where: { inProgress: false } });
      return res.status(200).json(matches);
    }
    const matches = await this.matchesService.getAllMatches();
    return res.status(200).json(matches);
  };

  createNewMatches = async (req: Request, res: Response) => {
    const matchBody = req.body;
    if (matchBody.homeTeam === matchBody.awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

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
