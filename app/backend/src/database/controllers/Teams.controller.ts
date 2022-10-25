import { Request, Response } from 'express';
import Teams from '../models/Teams.model';

class TeamsController {
  getTeams = (req: Request, res: Response) => {
    const teams = Teams.findAll();
    return res.status(200).json(teams);
  };

  getTeamsById = (req: Request, res: Response) => {
    const { id } = req.params;
    const teams = Teams.findByPk(id);
    return res.status(200).json(teams);
  };
}

export default new TeamsController();
