import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";
// Routers import
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// Public imports
import {dirname} from "path";
import {fileURLToPath} from "url";
import path from "path";

// Middleware import
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

//* Middlewares
app.use(express.static(path.resolve(__dirname, "./public")));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

//! Page not found middleware
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

//! Error middleware
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
try {
  await mongoose.connect(process.env.DB_URL);
  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
