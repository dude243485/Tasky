import { Router } from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    toggleTask
} from "../controllers/tasks.controllers.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadImage, processImage, handleMulterError } from "../lib/upload.js";

const router = Router();

//all task routes require authentication
router.use(protect);

const withImage = [uploadImage, handleMulterError, processImage];



// GET  /api/tasks   - list tasks (supports ?date=, ?completed=, ?priority=, ?category=, ?tag=, ?search=)
// POST /api/tasks   - create a task (multipart/form-data, optional image field)
router.get("/", getTasks);
router.post("/", ...withImage, createTask);


// GET    /api/tasks/:id  - get single task
// PATCH  /api/tasks/:id  - update task (multipart/form-data, optional image field)
// DELETE /api/tasks/:id  - delete task
router.get('/:id', getTask);
router.patch('/:id', ...withImage, updateTask);
router.delete('/:id', deleteTask);

// PATCH /api/tasks/:id/toggle  - toggle completed status
router.patch('/:id/toggle', toggleTask);

export default router;