import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createPromo,
  deletePromo,
  getAllPromos,
  getPromoById,
  updatePromo,
  applyPromoCode 
} from "../controllers/promoController.js";

const promoRouter = express.Router();

// Public routes
promoRouter.get("/promoById/:id", getPromoById);

// Route to apply a promo code
promoRouter.post("/applyPromoCode", authMiddleware(["admin", "customer", "staff"]), applyPromoCode);

// Admin routes
promoRouter.get("/allPromos", authMiddleware(["admin", "customer","staff"]), getAllPromos);
promoRouter.post("/create", authMiddleware(["admin"]), createPromo);
promoRouter.put("/update/:id", authMiddleware(["admin"]), updatePromo);
promoRouter.delete("/delete/:id", authMiddleware(["admin"]), deletePromo);

export default promoRouter;
