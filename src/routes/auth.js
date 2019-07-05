import express from 'express';
import AuthController from '../controllers/AuthController';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import RegisterMiddleware from '../middlewares/RegisterMiddleware';
import ValidationErrors from '../middlewares/ValidationErrors';

const router = express.Router();

router.post('/auth/signin', LoginMiddleware, ValidationErrors, AuthController.login);
router.post('/auth/signup', RegisterMiddleware, ValidationErrors, AuthController.register);

export default router;
