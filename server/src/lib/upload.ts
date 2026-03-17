import "dotenv/config";
import fs from "fs";
import path from "path"
import multer from "multer";
import sharp from "sharp";
import type { Request, Response, NextFunction } from "express";

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const TARGET_SIZE_KB = 300;

//dir creation
export const UPLOADS_DIR = path.join(process.cwd(), "uploads", "tasks");
const TEMP_DIR = path.join(process.cwd(), "uploads", "temp");

[UPLOADS_DIR, TEMP_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
})

//multer temp storage
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, TEMP_DIR),
    filename: (_req, _file, cb) => cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}`),
})

const upload = multer({
    storage,
    limits: { fileSize: MAX_UPLOAD_BYTES },
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    }
});


//sharp compression middleware
export const processImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.file) return next();

    const tempPath = req.file.path;
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
    const finalPath = path.join(UPLOADS_DIR, filename);

    try {
        let quality = 85;
        let buffer = await sharp(tempPath).rotate().jpeg({ quality }).toBuffer();

        while (buffer.byteLength > TARGET_SIZE_KB * 1024 && quality > 20) {
            quality -= 10;
            buffer = await sharp(tempPath).rotate().jpeg({ quality }).toBuffer();
        }
        fs.writeFileSync(finalPath, buffer);
        fs.unlinkSync(tempPath); //clean up the temp file

        (req as any).processedImagePath = `/uploads/tasks/${filename}`;
        next();
    } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        next(err);
    }
}

export const deleteImageFile = (imageUrl: string): void => {
    try {
        const filename = path.basename(imageUrl);
        const filePath = path.join(UPLOADS_DIR, filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (err) {
        console.error("Failed to delete image file", err);
    }
}

export const handleMulterError = (err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({ error: "Image must be 4MB or less" });
        return;
    }

    if (err?.message === "Only image files are allowed") {
        res.status(400).json({ error: "Only image files are allowed" });
        return;
    }
    next(err);
}

export const uploadImage = upload.single("image");