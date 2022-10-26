import User from '../models/User.model';
import { IUser } from '../interfaces/IUser';
import decodeJwt from '../utils/decodeToken';

export default class LoginService {
  getByEmail = async (email: string): Promise<IUser | null> => {
    const getUser = await User.findOne({ where: { email } });
    return getUser;
  };

  getRole = (token: string) => {
    const { role } = decodeJwt(token);
    return { role };
  };
}
