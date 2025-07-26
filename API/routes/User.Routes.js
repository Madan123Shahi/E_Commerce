import {
  PhoneRegistration,
  verifyOTP,
  EmailRegistration,
  VerifyEOTP,
} from "../controllers/Users.Controller.js";
import express from "express";
const router = express.Router();

router
  .post("/registration", PhoneRegistration)
  .post("/verifyOTP", verifyOTP)
  .post("/Eregistration", EmailRegistration)
  .post("/verify/EOTP", VerifyEOTP);

export default router;
