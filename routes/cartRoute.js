import express from "express";
import {
  addToCart,
  removeFromCart,
  fetchCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware(["admin", "customer", "staff"]), addToCart);
cartRouter.post(
  "/remove",
  authMiddleware(["admin", "customer", "staff"]),
  removeFromCart
);
cartRouter.post("/get", authMiddleware(["admin", "customer", "staff"]), fetchCart);

export default cartRouter;
