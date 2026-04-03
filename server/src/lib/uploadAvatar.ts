import "dotenv/config";
import fs from "fs";
import path from "path";
import multer from "multer";
import sharp from "sharp";
import type { Request, Response, NextFunction } from "express";

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const TARGET_SIZE_KB = 200;

export const AVATARS_DIR = path.join(process.cwd(), "uploads", "avatars");
const TEMP_DIR = path.join(process.cwd(), "uploads", "temp");

[AVATARS_DIR, TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, TEMP_DIR),
    filename: (_req, _file, cb) =>
        cb(null, `avatar-${Date.now()}-${Math.random().toString(36).slice(2)}`),
});

const upload = multer({
    storage,
    limits: { fileSize: MAX_UPLOAD_BYTES },
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    },
});

/** Compress the uploaded avatar and move it to avatars/ */
export const processAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (!req.file) return next();

    const tempPath = req.file.path;
    const filename = `avatar-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.jpg`;
    const finalPath = path.join(AVATARS_DIR, filename);

    try {
        let quality = 85;
        let buffer = await sharp(tempPath)
            .rotate()
            .resize({ width: 400, height: 400, fit: "cover" })
            .jpeg({ quality })
            .toBuffer();

        while (buffer.byteLength > TARGET_SIZE_KB * 1024 && quality > 20) {
            quality -= 10;
            buffer = await sharp(tempPath)
                .rotate()
                .resize({ width: 400, height: 400, fit: "cover" })
                .jpeg({ quality })
                .toBuffer();
        }

        fs.writeFileSync(finalPath, buffer);
        fs.unlinkSync(tempPath);

        (req as any).processedAvatarPath = `/uploads/avatars/${filename}`;
        next();
    } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        next(err);
    }
};

/** Delete the old avatar file from disk (safe – silently ignores missing files) */
export const deleteAvatarFile = (avatarUrl: string): void => {
    try {
        const filename = path.basename(avatarUrl);
        const filePath = path.join(AVATARS_DIR, filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (err) {
        console.error("Failed to delete avatar file", err);
    }
};

export const handleAvatarMulterError = (
    err: any,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({ error: "Avatar must be 4 MB or less" });
        return;
    }
    if (err?.message === "Only image files are allowed") {
        res.status(400).json({ error: "Only image files are allowed" });
        return;
    }
    next(err);
};

export const uploadAvatar = upload.single("avatar");
