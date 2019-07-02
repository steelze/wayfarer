import express from 'express';
import AuthController from '../controllers/AuthController';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import RegisterMiddleware from '../middlewares/RegisterMiddleware';
import MiddlewareErrors from '../middlewares/MiddlewareErrors';

const router = express.Router();

router.post('/auth/login', LoginMiddleware, MiddlewareErrors, AuthController.login);
router.post('/auth/signup', RegisterMiddleware, MiddlewareErrors, AuthController.register);

export default router;
