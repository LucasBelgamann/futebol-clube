import { NextFunction, Request, Response } from 'express';
import Service from '../services/Login.service';

const serviceLogin = new Service();

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const user = await serviceLogin.getByEmail(email);

  if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
  next();
};

export default authentication;
