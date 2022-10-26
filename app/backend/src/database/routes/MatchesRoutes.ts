import { Router } from 'express';
import Controller from '../controllers/Matches.controller';
// import ValidateLogin from '../middlewares/loginAuthentication';

const router = Router();
// const validateLogin = new ValidateLogin();

router.get('/', Controller.getMatches);
router.post('/', Controller.createNewMatches);

export default router;
