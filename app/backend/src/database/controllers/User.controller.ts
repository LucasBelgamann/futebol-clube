import { Request, Response } from 'express';
import Service from '../services/Login.service';
// import createToken from '../utils/createToken';

export default class LoginController {
  private loginService: Service;

  constructor() {
    this.loginService = new Service();
  }

  async getLogin(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(200).json({ message: 'unauthenticated' });

    const roleUser = await this.loginService.getRole(authorization);

    return res.status(201).json(roleUser);
  }

  // async postLogin(req: Request, res: Response) {
  //   const { email } = req.body;
  //   const user = await this.loginService.getByEmail(email);
  //   const userRole = {
  //     role: user?.role,
  //     password: user?.password,
  //   };

  //   const token = createToken(userRole);
  //   res.status(200).json({ token });
  // }
}
