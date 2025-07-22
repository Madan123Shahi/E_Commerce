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
import { validateObjectID } from "../middleware/validateObjectID.js";

const router = express.Router();

router.post("/register", registerUser).post("/logIn", logIn);
router.get("/", getUsers).get("/:id", protect, getUser);
router.put("/:id", validateObjectID, protect, isAdmin, updateUser);
router.delete("/:id", validateObjectID, protect, isAdmin, deleteUser);
export default router;
