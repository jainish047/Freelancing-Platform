import express from "express";
import { filterProjects } from "../controllers/projectsController.js";

const router = express.Router()

router.get("/", filterProjects)

export default router;