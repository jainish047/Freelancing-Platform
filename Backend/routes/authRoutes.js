import express from "express";
import {login, signin, verifyEmail, resendVerificationEMail} from "../controllers/authControllers.js"

const router = express.Router()

router.post("/login", login)

router.post("/signin", signin)

router.post("/verifyEmail", verifyEmail)

router.get("/resendVerificationEMail", resendVerificationEMail)

export default router;