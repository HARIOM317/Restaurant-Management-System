import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post(
  "/place",
  authMiddleware(["admin", "customer", "staff"]),
  placeOrder
);
orderRouter.post(
  "/verify",
  authMiddleware(["admin", "customer", "staff"]),
  verifyOrder
);
orderRouter.post(
  "/userorders",
  authMiddleware(["admin", "customer", "staff"]),
  userOrders
);
orderRouter.get("/list", authMiddleware(["admin", "staff"]), listOrders);
orderRouter.post("/status", authMiddleware(["admin", "staff"]), updateStatus);

export default orderRouter;
