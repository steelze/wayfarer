import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import IsAdminMiddleware from '../middlewares/IsAdminMiddleware';
import CreateTripMiddleware from '../middlewares/CreateTripMiddleware';
import TripController from '../controllers/TripController';
import ValidationErrors from '../middlewares/ValidationErrors';

const router = express.Router();

router.get('/trips', AuthMiddleware, TripController.view);
router.post('/trips', AuthMiddleware, IsAdminMiddleware, CreateTripMiddleware, ValidationErrors, TripController.create);

export default router;
