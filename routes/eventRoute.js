import express from "express";
import {
  createEvent,
  verifyEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  updateEvent,
} from "../controllers/eventController.js";
import authMiddleware from "../middleware/auth.js";

const eventRouter = express.Router();

// Public routes
eventRouter.get("/allEvents", getAllEvents);
eventRouter.get("/getById/:id", getEventById);

// Admin and Manager routes
eventRouter.post(
  "/add",
  authMiddleware(["admin", "customer", "staff"]),
  createEvent
);
eventRouter.post("/verify", verifyEvent);
eventRouter.put("/update/:id", authMiddleware(["admin", "staff"]), updateEvent);
eventRouter.delete("/delete/:id", authMiddleware(["admin"]), deleteEvent);

export default eventRouter;
