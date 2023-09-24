import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";
dotenv.config();

const connect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGOURL)
      .then(() => console.log("Successfully connected to Database"));
  } catch (error) {
    throw error;
  }
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
app.listen(process.env.PORT, () => {
  connect();
  console.log("Server Started at Port : ", process.env.PORT);
});
