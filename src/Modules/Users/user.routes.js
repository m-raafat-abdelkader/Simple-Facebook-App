import {Router} from 'express';
import * as userController from './user.controller.js';


const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/get', userController.getUser);







export default router;