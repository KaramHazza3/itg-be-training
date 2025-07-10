import express from 'express'
import { renderLogin, renderSignUp, registerController, loginController, logOutController } from '../controllers/auth-controller.js';

const router = express.Router();

router.get('/signup', renderSignUp);
router.post('/signup', registerController);
router.get('/login', renderLogin);
router.post('/login', loginController);
router.post('/logout', logOutController)

export default router;