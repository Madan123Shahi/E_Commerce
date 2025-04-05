const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  register,
  verifyUser,
  contactChecker,
} = require("../controllers/users.js");
const logger = require("../utils/logger");

router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be atleast 2 characters long"),
    body("contact")
      .notEmpty()
      .withMessage("Email or Phone Number is required")
      .custom((value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
          throw new Error("Enter a valid Email or Phone Number");
        }
        return true;
      }),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain atleast one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain atleast one lowercase letter")
      .matches(/\d/)
      .withMessage("Password must contain atleast one digit number")
      .matches(/[!@#$%^&*]/)
      .withMessage("Password must contain atleast one specail character"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg;
      logger.warn(`Validation failed for /register:${errorMessage}`);
      return res.status(400).json({ message: errorMessage });
    }
    // if no errors pass controll to the register controller
    logger.info(`Incoming /regitser request for ${req.body.contact}`);
    register(req, res, next);
  }
);
router.post("/verify", (req, res, next) => {
  logger.info(
    `Incoming /verify request with token starting:${req.body.token?.slice(
      0,
      10
    )}...`
  );
  verifyUser(req, res, next);
});

router.post("/check-contact", contactChecker);
module.exports = router;
