import { Router } from 'express';
import ValidateLogin from '../middlewares/loginAuthentication';
import LoginController from '../controllers/User.controller';

const router = Router();

const validateLogin = new ValidateLogin();
const loginController = new LoginController();

router.get('/validate', loginController.getLogin);
router.post('/', validateLogin.authentication);

export default router;
