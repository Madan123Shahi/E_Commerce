import express from "express";
import {
  registerUser,
  logIn,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userC.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser).post("/logIn", logIn);
router.get("/", protect, getUser);
router.put("/update", protect, updateUser);
router.delete("/delete", protect, deleteUser);
export default router;
