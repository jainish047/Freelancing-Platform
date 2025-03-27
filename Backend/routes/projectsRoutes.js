import express from "express";
import {
  filterProjects,
  getProjectDetails,
  bidOnProject,
  bookmarkProject,
  unbookmarkProject,
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

router.post(
  "/:projectId/bookmark",
  passport.authenticate("jwt", { session: false }),
  bookmarkProject
);

router.delete(
  "/:projectId/bookmark",
  passport.authenticate("jwt", { session: false }),
  unbookmarkProject
);

export default router;
