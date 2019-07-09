import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import IsAdminMiddleware from '../middlewares/IsAdminMiddleware';
import CreateTripMiddleware from '../middlewares/CreateTripMiddleware';
import ValidationErrors from '../middlewares/ValidationErrors';
import BookingController from '../controllers/BookingController';

const router = express.Router();

router.get('/bookings', AuthMiddleware, BookingController.view);
router.post('/bookings', AuthMiddleware, IsAdminMiddleware, CreateTripMiddleware, ValidationErrors, BookingController.create);

export default router;
