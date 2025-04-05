import express from "express";
import {
  filterProjects,
  getProjectDetails,
  bidOnProject,
  getMyProjects,
  getAssignedProjects,
} from "../controllers/projectsController.js";
import passport from "passport";
import "../strategy/jwt.js";

const router = express.Router();

router.get("/", filterProjects);

router.get("/:projectId", getProjectDetails);

router.post(
  "/:projectId/bid",
  passport.authenticate("jwt", { session: false }),
  bidOnProject
);

export default router;