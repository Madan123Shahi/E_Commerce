import express from "express";
import {
  registerUser,
  logIn,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userC.js";
import { protect } from "../middleware/protect.js";
import { isAdmin } from "./../middleware/isAdmin.js";

const router = express.Router();

router.post("/register", registerUser).post("/logIn", logIn);
router.get("/", getUsers).get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", isAdmin, protect, deleteUser);
export default router;
