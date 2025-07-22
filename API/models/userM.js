import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneExp = /^\+\d{1,3}\s?\d{6,14}$/;
const passwordExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|\\]).{8,}$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: function (v) {
          return emailExp.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return phoneExp.test(v);
        },
        message: (props) => `${props.value} is not a valid Phone Number`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be atleast 8 Character Long"],
      select: false,
      validate: {
        validator: function (v) {
          return passwordExp.test(v);
        },
        message: `Password must contain atleast one digit, one lowercase, one uppercase and one specail charcter`,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword || typeof enteredPassword !== "string")
    throw new Error("Password must be string");
  if (!this.password) {
    throw new Error("Password is missing");
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
