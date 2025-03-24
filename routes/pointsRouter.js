import express from 'express';
import { addPoints, getPoints, redeemPoints, getPointsHistory } from '../controllers/pointsController.js';
import authMiddleware from "../middleware/auth.js";

const pointsRouter = express.Router();

// Route to add points to a user
pointsRouter.post('/add', authMiddleware(["customer","staff","admin"]), addPoints);

// Route to redeem points and create a discount coupon
pointsRouter.post('/redeem', authMiddleware(["customer","staff","admin"]), redeemPoints);

// Route to get points of a user
pointsRouter.get('/:userId', authMiddleware(["customer","staff","admin"]), getPoints);

// Route to get points history of a user
pointsRouter.get('/history/:userId', authMiddleware(["customer","staff","admin"]), getPointsHistory);

export default pointsRouter;
