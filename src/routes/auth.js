import express from 'express';
import RegisterController from '../controllers/RegisterController';
import RegisterMiddleware from '../middlewares/RegisterMiddleware';
import MiddlewareErrors from '../middlewares/MiddlewareErrors';

const router = express.Router();

router.post('/auth/signup', RegisterMiddleware, MiddlewareErrors, RegisterController.register);

export default router;
