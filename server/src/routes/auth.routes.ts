import { Router } from "express";
import { signup, signin, googleRedirect, googleCallback } from "../controllers/auth.controllers";


const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/google", googleRedirect);
router.get("/google/callback", googleCallback);

export default router;