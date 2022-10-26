import { Router } from 'express';
import ValidateLogin from '../middlewares/loginAuthentication';
import getLogin from '../controllers/User.controller';

const router = Router();

const validateLogin = new ValidateLogin();

router.get('/validate', getLogin);
router.post('/', validateLogin.authentication);

export default router;
