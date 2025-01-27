import express from "express";
import { selfDetails } from "../controllers/userController.js";

const router = express.Router()

router.get("/self", selfDetails)

export default router;