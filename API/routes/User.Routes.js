import {
  PhoneRegistration,
  verifyOTP,
  EmailRegistration,
} from "../controllers/Users.Controller.js";
import express from "express";
const router = express.Router();

router
  .post("/registration", PhoneRegistration)
  .post("/verifyOTP", verifyOTP)
  .post("/Eregistration", EmailRegistration);

export default router;
