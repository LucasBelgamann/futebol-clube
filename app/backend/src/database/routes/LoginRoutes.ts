import { Router } from 'express';
import authentication from '../middlewares/loginAuthentication';
import UserController from '../controllers/User.controller';

const router = Router();

const userController = new UserController();

router.get('/validate', authentication, userController.getLogin);
router.post('/', authentication, userController.postLogin);

export default Router;
