import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import TripController from '../controllers/TripController';

const router = express.Router();

router.get('/trips', AuthMiddleware, TripController.view);
// router.post('/trips', AuthMiddleware, ValidationErrors, AuthController.register);

export default router;
