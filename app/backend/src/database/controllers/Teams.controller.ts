import { Request, Response } from 'express';
import Service from '../services/Teams.service';

class TeamsController {
  private teamsService: Service;

  constructor() {
    this.teamsService = new Service();
  }

  getTeams(_req: Request, res: Response) {
    const teams = this.teamsService.getTeams();
    return res.status(200).json(teams);
  }

  getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const teams = this.teamsService.getTeamsById(Number(id));
    return res.status(200).json(teams);
  }
}

export default new TeamsController();
