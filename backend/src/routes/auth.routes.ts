import { Router } from "express";
import { googleLogin, register, signin } from "../controllers/auth.controller.js"

const router = Router();

router.post("/google", googleLogin);
router.post("/signup", register);
router.post("/signin", signin);

export default router;