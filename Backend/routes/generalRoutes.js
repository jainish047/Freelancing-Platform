import express from "express";
import { fetchSkills, fetchCountries } from "../controllers/generalController.js";

const router = express.Router()

router.get("/skills", fetchSkills)

router.get("/countries", fetchCountries)

export default router;