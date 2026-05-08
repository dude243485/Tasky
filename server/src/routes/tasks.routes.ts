import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { uploadImage, processImage, handleMulterError } from "../lib/upload";
import { getTasks, createTask, getTask, updateTask, deleteTask, toggleTask, getWeeklyStats } from "../controllers/tasks.controller"



const router = Router();

//all task routes require authentication
router.use(protect);

const withImage = [uploadImage, handleMulterError, processImage];

//POST /api/tasks - create a task (multipart/form-data, optional image field)
router.get("/", getTasks);
router.post("/", ...withImage, createTask);


//GET /api/tasks/:id - get single task
//DELETE /api/tasks/:id

// Stats — must be before /:id to avoid shadowing
router.get("/stats/weekly", getWeeklyStats);

router.get("/:id", getTask);


//PATCH /api/tasks/:id/toggle - must be registered BEFORE /:id to avoid route shadowing
router.patch("/:id/toggle", toggleTask);

router.patch("/:id", ...withImage, updateTask);
router.delete("/:id", deleteTask);

export default router;