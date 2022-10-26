import { NextFunction, Request, Response } from 'express';
import decodeJwt from '../utils/decodeToken';

const authenticationMatches = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  try {
    decodeJwt(authorization);
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default authenticationMatches;
