import mongoose from "mongoose";
// Improved regex patterns
// const phoneExp = /^\+\d{1,3}[\s-]?\d{6,14}$/;  // Allows +1 123456 or +91-123456789
// const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;  // Covers new TLDs like .accountant
const phoneExp = /^\+\d{1,3}\s?\d{6,14}$/;
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const otpSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone is required for first step"],
      validate: {
        validator: function (v) {
          return phoneExp.test(v);
        },
        message: (props) => `${props.value} is not a valid number`,
      },
    },
    email: {
      type: String,
      lowercase: true,
      validate: {
        validator: function (v) {
          return !v || emailExp.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    fullName: {
      type: String,
      trim: true,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationAttempts: {
      type: Number,
      default: 0,
      max: 3,
    },
    blockedUntil: Date,
  },
  {
    timestamps: true,
  }
);

otpSchema.index({ phone: 1 }, { unique: true });
otpSchema.index({ email: 1 }, { sparse: true });

otpSchema.pre("save", function (next) {
  if (
    this.isNew &&
    this.email &&
    this.isModified("email") &&
    !this.phoneVerified
  ) {
    throw new Error("Phone must be verified before adding email");
  }
  next();
});

export const User = mongoose.model("OTP", otpSchema);
