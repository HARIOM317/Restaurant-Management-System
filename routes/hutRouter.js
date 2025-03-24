import express from "express";
import {
  createHut,
  deleteHut,
  getAllHuts,
  getHutById,
  updateHut,
} from "../controllers/hutController.js";
import authMiddleware from "../middleware/auth.js";

const hutRouter = express.Router();

// Admin and Manager routes
hutRouter.post("/add", authMiddleware(["admin"]), createHut);
hutRouter.get("/allHuts", authMiddleware(["admin", "customer","staff"]), getAllHuts);
hutRouter.get("/getById/:id", authMiddleware(["admin"]), getHutById);
hutRouter.patch("/update/:id", authMiddleware(["admin","staff"]), updateHut);
hutRouter.delete("/delete/:id", authMiddleware(["admin"]), deleteHut);

export default hutRouter;
