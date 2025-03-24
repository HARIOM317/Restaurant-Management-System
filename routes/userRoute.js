import express from "express";
import multer from "multer";
import {
  loginUser,
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callBack) => {
    return callBack(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get(
  "/all",
  authMiddleware(["admin", "staff", "customer"]),
  getAllUsers
);
userRouter.get("/:id", getUserById);
userRouter.patch(
  "/:id",
  authMiddleware(["admin", "staff", "customer"]),
  upload.single("profilePicture"),
  updateUser
);
userRouter.delete("/:id", authMiddleware(["admin"]), deleteUser);

export default userRouter;
