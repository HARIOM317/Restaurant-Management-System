import express from "express";
import multer from "multer";
import {
  createCarouselItem,
  deleteCarouselItem,
  getAllCarouselItems,
  getCarouselItemById,
  updateCarouselItem,
} from "../controllers/carouselController.js";
import authMiddleware from "../middleware/auth.js";

const carouselRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads/carousel_images",
  filename: (req, file, callBack) => {
    return callBack(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Public routes
carouselRouter.get("/getAll", getAllCarouselItems);
carouselRouter.get("/getById/:id", getCarouselItemById);

// Admin and Manager routes
carouselRouter.post(
  "/create",
  authMiddleware(["admin"]),
  upload.single("image"),
  createCarouselItem
);

carouselRouter.put(
  "/update/:id",
  authMiddleware(["admin"]),
  upload.single("image"),
  updateCarouselItem
);

carouselRouter.delete(
  "/delete/:id",
  authMiddleware(["admin"]),
  deleteCarouselItem
);

export default carouselRouter;
