const mongoose = require("mongoose");
const validator = require("validator");
const { isValidPhoneNumber } = require("libphonenumber-js");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Number is required"],
    validate: {
      //   validator: function (v) {
      //     return /\d{10}/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid phone number`,
      validator: function (v) {
        isValidPhoneNumber(v);
      },
      message: (props) => `${props.value} is not a valid number`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 character long"],
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          v
        );
      },
      message: (props) =>
        `Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!`,
    },
  },
  role: {
    type: [String, { default: "customer" }],
  },
});

module.exports = mongoose.model("User", userSchema);
