const mongoose = require("mongoose");
const logger = require("../middlewares/logger");
const connectDB = (URI) => {
  mongoose.connect(URI);
  logger.info(`Database Connected Successfully at ${process.env.MONGO_URI}`);
};

module.exports = connectDB;
