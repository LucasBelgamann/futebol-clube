import { Request, Response } from 'express';
import LoginService from '../services/Login.service';
import CreateToken from '../utils/createToken';

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  getLogin(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(200).json({ message: 'unauthorized' });

    const roleUser = this.service.getRole(authorization);

    return res.status(201).json(roleUser);
  }

  async postLogin(req: Request, res: Response) {
    const { email } = req.body;
    const user = await this.service.getByEmail(email);
    const userRole = {
      role: user?.role,
      password: user?.password,
    };

    const token = CreateToken(userRole);
    res.status(200).json({ token });
  }
}
