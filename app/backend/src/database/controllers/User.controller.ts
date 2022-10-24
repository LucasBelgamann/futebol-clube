import { Request, Response } from 'express';
import LoginService from '../services/Login.service';

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  getLogin(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(200).json({ message: 'unthorization' });

    const roleUser = this.service.getRole(authorization);

    return res.status(201).json(roleUser);
  }
}
