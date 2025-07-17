import mongoose from "mongoose";
// Improved regex patterns
// const phoneExp = /^\+\d{1,3}[\s-]?\d{6,14}$/;  // Allows +1 123456 or +91-123456789
// const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;  // Covers new TLDs like .accountant
const phoneExp = /^\+\d{1,3}\s?\d{6,14}$/;
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator: function (v) {
        // return phoneExp.test(v);
        // Only Validate if Phone Exists
        return !v || phoneExp.test(v);
      },
      message: (props) => `${props.value} is not a valid number`,
    },
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    sparse: true,
    validate: {
      validator: function (v) {
        return emailExp.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
});

otpSchema.pre("validate", function (next) {
  if (!this.phone && !this.email) {
    this.invalidate("phoneoremail", "Either Email or Phone field is required");
  }
  next();
});
