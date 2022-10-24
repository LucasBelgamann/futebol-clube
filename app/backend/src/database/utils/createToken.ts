import { sign } from 'jsonwebtoken';

const createToken = (payload: unknown) => {
  const token = sign({ payload }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  return token;
};

export default createToken;
