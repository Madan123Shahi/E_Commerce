const jwt = require("jsonwebtoken");

exports.signToken = (payload, expiresIn = "10m") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  console.log("JWT_SECRET in signToken:", process.env.JWT_SECRET);
};
exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
