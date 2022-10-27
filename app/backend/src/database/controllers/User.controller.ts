import { Request, Response } from 'express';
import Service from '../services/Login.service';

class LoginController {
  private service: Service;

  constructor() {
    this.service = new Service();
  }

  getLogin = (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(200).json({ message: 'unauthenticated' });

    const roleUser = this.service.getRole(authorization);

    return res.status(200).json(roleUser);
  };
}

export default LoginController;
