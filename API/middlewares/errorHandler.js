const logger = require("../utils/logger");

// Best One
module.exports = (err, req, res, next) => {
  // 🔧 Default error message
  let message = "Internal Server Error";
  let statusCode = 500;

  // 🧠 Handle specific error types
  if (err.name === "TokenExpiredError") {
    message = "Token Expired. Please request new one";
    statusCode = 401;
  } else if (err.name === "JsonWebTokenError") {
    message = "Invalid or tampered token.";
    statusCode = 401;
  } else if (err.name === "ValidationError") {
    message = err.message;
    statusCode = 400;
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    message = `Duplicate value for field '${field}'`;
    statusCode = 409;
  }

  // 🖨 Log final message to console
  logger.error(`Error Handler:${message}\n${err.stack}`);

  // Send response
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

// module.exports = (err, req, res, next) => {
//   // to show full errors
//   console.log(err.stack);
//   if (err.code === 11000) {
//     const field = Object.keys(err.keyPattern)[0]; // Get the Field that caused the duplication error
//     return res.status(409).json({
//       Success: false,
//       Message: `Duplicate Value For The ${field}. Please use a different ${field}`,
//     });
//   }
//   if (err.name === "ValidationError")
//     return res.status(400).json({ Success: false, Message: err.message });
//   if (err.name === "JsonWebTokenError")
//     return res
//       .status(401)
//       .json({ Success: false, Message: "Token is tampered or invalid" });
//   if (err.name === "TokenExpiredError")
//     return res.status(401).json({
//       Success: false,
//       Message: "Token Expired.Please request new one",
//     });
//   return res
//     .status(500)
//     .json({ Success: false, Message: "Internal Server Error " });
// };
