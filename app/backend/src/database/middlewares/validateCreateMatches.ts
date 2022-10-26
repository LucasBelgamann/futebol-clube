import { NextFunction, Request, Response } from 'express';
import decodeJwt from '../utils/decodeToken';

const authenticationMatches = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const matchBody = req.body;
  if (matchBody.homeTeam === matchBody.awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
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
