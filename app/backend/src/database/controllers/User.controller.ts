import { Request, Response } from 'express';
import Service from '../services/Login.service';

const loginService = new Service();

const getLogin = (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(200).json({ message: 'unauthenticated' });

  const roleUser = loginService.getRole(authorization);

  return res.status(200).json(roleUser);
};

export default getLogin;
