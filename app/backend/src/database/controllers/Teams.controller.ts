import { Request, Response } from 'express';
import Teams from '../models/Teams.model';

class TeamsController {
  getTeams = async (req: Request, res: Response) => {
    const teams = await Teams.findAll();
    return res.status(200).json(teams);
  };

  getTeamsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teams = await Teams.findOne({ where: { id } });
    return res.status(200).json(teams);
  };
}

export default new TeamsController();
