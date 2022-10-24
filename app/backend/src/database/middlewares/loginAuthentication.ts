import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import Service from '../services/Login.service';
import CreateToken from '../utils/createToken';

const serviceLogin = new Service();

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const user = await serviceLogin.getByEmail(email);

  if (!user) return res.status(401).json({ message: 'Incorrect email or password' });

  const comparePassword = await compare(password, user.password);

  if (!comparePassword) return res.status(401).json({ message: 'Incorrect email or password' });

  const userRole = {
    role: user.role,
    password: user.password,
  };

  const token = CreateToken(userRole);
  res.status(200).json({ token });
  next();
};

export default authentication;
