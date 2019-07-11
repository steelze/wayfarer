import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import IsAdminMiddleware from '../middlewares/IsAdminMiddleware';
import CreateBusMiddleware from '../middlewares/CreateBusMiddleware';
import BusController from '../controllers/BusController';
import ValidationErrors from '../middlewares/ValidationErrors';

const router = express.Router();

router.get('/buses', AuthMiddleware, IsAdminMiddleware, BusController.view);
router.post('/buses', AuthMiddleware, IsAdminMiddleware, CreateBusMiddleware, ValidationErrors, BusController.create);

export default router;
