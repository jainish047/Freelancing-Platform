import express from "express";
import {login, signup, verifyEmail, resendVerificationEMail} from "../controllers/authControllers.js"

const router = express.Router()

router.post("/login", login)

router.post("/signup", signup)

router.post("/verifyEmail", verifyEmail)

router.get("/resendVerificationEMail", resendVerificationEMail)

export default router;