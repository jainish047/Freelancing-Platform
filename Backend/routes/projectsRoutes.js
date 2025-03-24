import express from "express";
import { filterProjects } from "../controllers/projects.js";

const router = express.Router()

router.get("/", filterProjects)

export default router;