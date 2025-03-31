import express from "express";
import {
  selfDetails,
  updateProfile,
  userDetails,
} from "../controllers/userController.js";
import passport from "passport";
import {
  getAssignedProjects,
  getMyProjects,
} from "../controllers/projectsController.js";

const router = express.Router();

router.get(
  "/self",
  passport.authenticate("jwt", { session: false }),
  selfDetails
);

router.put(
  "/self",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

router.get("/:id", userDetails);

export default router;
