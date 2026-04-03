import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
    uploadAvatar,
    processAvatar,
    handleAvatarMulterError,
} from "../lib/uploadAvatar";
import { getMe, updateMe, deleteMe } from "../controllers/user.controller";

const router = Router();

// All user routes require a valid JWT
router.use(protect);

const withAvatar = [uploadAvatar, handleAvatarMulterError, processAvatar];

// GET  /api/users/me   – fetch the logged-in user's profile
router.get("/me", getMe);

// PATCH /api/users/me  – update name / email / dob / avatar (multipart OK)
router.patch("/me", ...withAvatar, updateMe);

// DELETE /api/users/me – permanently delete account + all tasks
router.delete("/me", deleteMe);

export default router;
