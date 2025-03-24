import express from "express";
import {
  getAllOfflineOrders,
  createOfflineOrder,
  getOfflineOrderById,
  getOfflineOrdersByUserId,
  updateOfflineOrder,
  deleteOfflineOrder,
} from "../controllers/offlineOrderController.js";

import authMiddleware from "../middleware/auth.js";

const offlineOrderRouter = express.Router();

offlineOrderRouter.post(
  "/create",
  authMiddleware(["admin", "customer", "staff"]),
  createOfflineOrder
);

offlineOrderRouter.get(
  "/allOrders",
  authMiddleware(["admin", "staff"]),
  getAllOfflineOrders
);

offlineOrderRouter.get(
  "/getById/:id",
  authMiddleware(["admin", "customer", "staff"]),
  getOfflineOrderById
);

offlineOrderRouter.get(
  "/getByUserId/:userId",
  authMiddleware(["admin", "customer", "staff"]),
  getOfflineOrdersByUserId
);

offlineOrderRouter.patch(
  "/update/:id",
  authMiddleware(["admin", "customer", "staff"]),
  updateOfflineOrder
);

offlineOrderRouter.delete(
  "/delete/:id",
  authMiddleware(["admin"]),
  deleteOfflineOrder
);

export default offlineOrderRouter;
