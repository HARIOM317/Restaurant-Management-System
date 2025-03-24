import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

// Public routes
reviewRouter.get("/all", getAllReviews);
reviewRouter.get("/getById/:id", getReviewById);

// User routes
reviewRouter.post(
  "/create",
  authMiddleware(["customer", "admin"]),
  createReview
);
reviewRouter.put(
  "/update/:id",
  authMiddleware(["customer", "admin"]),
  updateReview
);
reviewRouter.delete(
  "/delete/:id",
  authMiddleware(["customer", "admin"]),
  deleteReview
);

export default reviewRouter;
