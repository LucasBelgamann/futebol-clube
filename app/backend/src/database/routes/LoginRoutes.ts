import { Router } from 'express';
import ValidateLogin from '../middlewares/loginAuthentication';
import UserController from '../controllers/User.controller';

const router = Router();

const userController = new UserController();
const validateLogin = new ValidateLogin();

router.get('/validate', validateLogin.authentication, userController.getLogin);
router.post('/', validateLogin.authentication, userController.postLogin);

export default Router;
