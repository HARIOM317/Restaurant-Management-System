import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  updateAvailability,
} from "../controllers/foodController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callBack) => {
    return callBack(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post(
  "/add",
  authMiddleware(["admin", "staff"]),
  upload.single("image"),
  addFood
);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", authMiddleware(["admin", "staff"]), removeFood);
foodRouter.patch(
  "/update-availability",
  authMiddleware(["admin", "staff"]),
  updateAvailability
);

export default foodRouter;
