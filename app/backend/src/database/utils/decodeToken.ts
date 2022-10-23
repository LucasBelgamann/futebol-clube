import { verify } from 'jsonwebtoken';
import IJwt from '../interfaces/IJwt';

const decodeJwt = (token: string) => {
  const { payload } = verify(token, process.env.JWT_SECRET as string) as IJwt;
  return payload;
};

export default decodeJwt;
