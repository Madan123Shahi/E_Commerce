import {
  PhoneRegistration,
  verifyOTP,
} from "../controllers/Users.Controller.js";
import express from "express";
const router = express.Router();

router.post("/registration", PhoneRegistration).post("/verifyOTP", verifyOTP);

export default router;
