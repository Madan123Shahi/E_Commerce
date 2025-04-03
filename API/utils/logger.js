const winston = require("winston");
require("winston-daily-rotate-file");
// Configure Winston logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug", // Log level
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    // Log to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: "logs/%DATE-combinded.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxfile: "14d",
    }),

    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file
    new winston.transports.File({ filename: "logs/combined.log" }), // Log all messages to a file
  ],
});

module.exports = logger;
