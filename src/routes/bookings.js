import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import IsAdminMiddleware from '../middlewares/IsAdminMiddleware';
import BookSeatMiddleware from '../middlewares/BookSeatMiddleware';
import ValidationErrors from '../middlewares/ValidationErrors';
import BookingController from '../controllers/BookingController';

const router = express.Router();

router.get('/bookings', AuthMiddleware, BookingController.view);
router.post('/bookings', AuthMiddleware, BookSeatMiddleware, ValidationErrors, BookingController.create);

export default router;
