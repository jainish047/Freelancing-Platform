import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";

import "./strategy/local.js"; // not using in project
import "./strategy/jwt.js";
import "./strategy/google.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import projectsRouter from "./routes/projectsRoutes.js";

import { EventEmitter } from "events";
// Increase the max listeners to 20 (or any number you find appropriate)
EventEmitter.defaultMaxListeners = 20;

dotenv.config();

const app = express();

// CORS setup to allow requests from your frontend (localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

// now no need for manual varification bcz of passport
// app.use((req, res, next) => {
//   // Skip this middleware for routes like /login and /signup
//   if (
//     req.originalUrl.includes("/auth/login") ||
//     req.originalUrl.includes("/auth/signup") ||
//     req.originalUrl.includes("/auth/verifyEmail")
//   ) {
//     return next();
//   }

//   const authHeader = req.header("Authorization");
//   if (!authHeader) {
//     // next()
//     return res.status(401).send("Access Denied");
//   }

//   const token = authHeader.startsWith("Bearer ")
//     ? authHeader.slice(7, authHeader.length).trim()
//     : authHeader;
//   if (!token) {
//     return res.status(401).send("Access Denied");
//   }

//   req.token = token;

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = decoded; // Attach user info to the request.
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token expired" });
//     } else {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//   }
// });

app.use("/api/auth", authRouter);
app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
app.use("/api/projects", projectsRouter);

// By default, Passport creates a session (for login-based authentication like username/password).
// Since JWT does not use sessions (it is stateless), we disable sessions with { session: false }.
// This ensures that Passport does not store authentication data in a session.

app.listen(process.env.PORT);
