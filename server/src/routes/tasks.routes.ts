import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { uploadImage, processImage, handleMulterError } from "../lib/upload";
import { getTasks, createTask, getTask } from "../controllers/tasks.controller"


const router = Router();

//all task routes require authentication
router.use(protect);

const withImage = [uploadImage, handleMulterError, processImage];

//POST /api/tasks - create a task (multipart/form-data, optional image field)
router.get("/", getTasks);
router.post("/", ...withImage, createTask);


//GET /api/tasks/:id - get single task
router.get("/:id", getTask);

export default router;