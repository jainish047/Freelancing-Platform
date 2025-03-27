import express from "express";
import { selfDetails, updateProfile } from "../controllers/userController.js";

const router = express.Router()

router.get("/self", selfDetails)

router.put("/self", updateProfile)

export default router;