import express from "express";
import multer from "multer";
import path from "path";

import {
  getAllPopups,
  getPopupById,
  createPopup,
  updatePopup,
  deletePopup,
} from "../controllers/popController.js";

import authMiddleware from "../middleware/auth.js";

const popupRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads/popup_images",
  filename: (req, file, callBack) => {
    return callBack(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Public routes
popupRouter.get("/all", getAllPopups);
popupRouter.get("/getById/:id", getPopupById);

// Admin and Customer routes
popupRouter.post(
  "/create",
  authMiddleware(["admin"]),
  upload.single("image_url"),
  createPopup
);
popupRouter.put(
  "/update/:id",
  authMiddleware(["admin"]),
  upload.single("image_url"),
  updatePopup
);
popupRouter.delete(
  "/delete/:id",
  authMiddleware(["admin"]),
  deletePopup
);

export default popupRouter;
