// routes/dashboardRoutes.js
import express from "express";
import {getDashboardData, generateReport} from '../controllers/dashboardController.js';
import authMiddleware from "../middleware/auth.js";

const dashboardRouter = express.Router();

dashboardRouter.get('/', authMiddleware(["admin"]), getDashboardData);
dashboardRouter.get('/report', authMiddleware(["admin"]), generateReport);

export default dashboardRouter;
