import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

import { EventEmitter } from "events";
// Increase the max listeners to 20 (or any number you find appropriate)
EventEmitter.defaultMaxListeners = 20;

dotenv.config();

const app = express();

// CORS setup to allow requests from your frontend (localhost:5173)
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  // Skip this middleware for routes like /login and /signup
  if (
    req.originalUrl.includes("/auth/login") ||
    req.originalUrl.includes("/auth/signin") ||
    req.originalUrl.includes("/auth/verifyEmail")
  ) {
    return next();
  }

  const authHeader = req.header("Authorization");
  if (!authHeader) {
    // next()
    return res.status(401).send("Access Denied");
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7, authHeader.length).trim()
    : authHeader;
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  req.token = token;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach user info to the request.
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT);
