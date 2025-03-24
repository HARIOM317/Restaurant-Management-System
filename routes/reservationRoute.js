import express from "express";
import {
  getAllReservations,
  createReservation,
  verifyReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUserId,
} from "../controllers/reservationController.js";
import authMiddleware from "../middleware/auth.js";

const reservationRouter = express.Router();

reservationRouter.post(
  "/add",
  authMiddleware(["admin", "customer", "staff"]),
  createReservation
);
reservationRouter.post("/verify", verifyReservation);
reservationRouter.get(
  "/all",
  authMiddleware(["admin", "staff"]),
  getAllReservations
);
reservationRouter.get(
  "/get/:id",
  authMiddleware(["admin", "customer", "staff"]),
  getReservationById
);
reservationRouter.get(
  "/getByUser/:id",
  authMiddleware(["admin", "customer", "staff"]),
  getReservationsByUserId
);
reservationRouter.patch(
  "/update/:id",
  authMiddleware(["admin", "customer", "staff"]),
  updateReservation
);
reservationRouter.delete(
  "/delete/:id",
  authMiddleware(["admin", "customer"]),
  deleteReservation
);

export default reservationRouter;
