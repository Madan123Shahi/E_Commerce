const express = require("express");
const app = express();
require("dotenv").config();
const { cleanEnv, str, port } = require("envalid");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/connectDB");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./utils/logger");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGO_URI: str({ desc: "MongoDB Connection URI" }),
});

const PORT = env.PORT;
const MONGO_URI = env.MONGO_URI;

// Configure Morgan for HTTP request logging
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoute);

app.use(errorHandler);
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    const server = app.listen(PORT, () =>
      logger.info(`Server is Connected Successfully at PORT ${PORT}`)
    );
    server.on("error", (err) => {
      logger.error(`Server Error: ${err.message}`);
      process.exit(1);
    });
  } catch (error) {
    logger.error(`StartUp Error : ${error.message}`);
    process.exit(1);
  }
};

process.on("uncaughtException", (err) => {
  logger.error(`Unhandled Exception:${err.message}`);
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
start();
