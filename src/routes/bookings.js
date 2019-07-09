import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import BookSeatMiddleware from '../middlewares/BookSeatMiddleware';
import DeleteBookingMiddleware from '../middlewares/DeleteBookingMiddleware';
import ValidationErrors from '../middlewares/ValidationErrors';
import BookingController from '../controllers/BookingController';

const router = express.Router();

router.get('/bookings', AuthMiddleware, BookingController.view);
router.post('/bookings', AuthMiddleware, BookSeatMiddleware, ValidationErrors, BookingController.create);
router.delete('/bookings/:id', AuthMiddleware, DeleteBookingMiddleware, ValidationErrors, BookingController.delete);

export default router;
