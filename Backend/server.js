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
import projectsRouter2 from "./routes/projectsRoutes2.js";
import generalRouter from "./routes/generalRoutes.js";
import listsRouter from "./routes/listsRoutes.js";
import freelancersRouter from "./routes/freelancersRoutes.js";

import { EventEmitter } from "events";
import { getUserIfThere } from "./common/user.js";
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

app.use("/api/auth", authRouter);
app.use("/api/general", generalRouter);
app.use("/api/user", getUserIfThere, userRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/projects2", projectsRouter2)
app.use("/api/freelancers", freelancersRouter);
app.use(
  "/api/lists",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
      if (!user)
        return res
          .status(401)
          .json({ message: info?.message || "Unauthorized" });

      req.user = user;
      next(); // Proceed to listsRouter
    })(req, res, next);
  },
  listsRouter
);

// By default, Passport creates a session (for login-based authentication like username/password).
// Since JWT does not use sessions (it is stateless), we disable sessions with { session: false }.
// This ensures that Passport does not store authentication data in a session.

app.listen(process.env.PORT);
