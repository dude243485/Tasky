import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { uploadImage, processImage, handleMulterError } from "../lib/upload";
import { getTasks } from "../controllers/tasks.controller"


const router = Router();

//all task routes require authentication
router.use(protect);

const withImage = [uploadImage, handleMulterError, processImage];

router.get("/", getTasks);

export default router;