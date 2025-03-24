import express from "express";
const tableRouter = express.Router();
import {
  createTable,
  deleteTable,
  getAllTables,
  getTableById,
  updateTable,
} from "../controllers/tableController.js";
import authMiddleware from "../middleware/auth.js";

// Admin and Manager routes
tableRouter.post("/add", authMiddleware(["admin"]), createTable);
tableRouter.get(
  "/allTables",
  authMiddleware(["admin", "customer", "staff"]),
  getAllTables
);
tableRouter.get("/getByID/:id", authMiddleware(["admin","staff"]), getTableById);
tableRouter.put("/update/:id", authMiddleware(["admin","staff"]), updateTable);
tableRouter.delete("/delete/:id", authMiddleware(["admin"]), deleteTable);

export default tableRouter;
