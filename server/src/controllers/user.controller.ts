import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";
import { deleteAvatarFile } from "../lib/uploadAvatar";


export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                email: true,
                dob: true,
                avatar: true,
                createdAt: true,
            },
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json({ user });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};


export const updateMe = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user!.id;

        // Build an update payload from only the fields that were sent
        const { firstName, lastName, email, dob } = req.body;

        const data: Record<string, any> = {};

        if (firstName !== undefined) {
            if (!firstName.trim()) {
                res.status(400).json({ message: "First name cannot be empty" });
                return;
            }
            data.firstName = firstName.trim();
            // Keep the legacy `name` field in sync
            data.name = firstName.trim();
        }

        if (lastName !== undefined) {
            if (!lastName.trim()) {
                res.status(400).json({ message: "Last name cannot be empty" });
                return;
            }
            data.lastName = lastName.trim();
        }

        if (email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ message: "Invalid email address" });
                return;
            }

            // Make sure the email isn't already taken by another user
            const existing = await prisma.user.findUnique({
                where: { email },
            });
            if (existing && existing.id !== userId) {
                res.status(409).json({ message: "Email is already in use" });
                return;
            }
            data.email = email.trim().toLowerCase();
        }

        if (dob !== undefined) {
            const parsed = new Date(dob);
            if (isNaN(parsed.getTime())) {
                res.status(400).json({ message: "Invalid date of birth" });
                return;
            }
            data.dob = parsed;
        }

        // Handle avatar upload (processed by the uploadAvatar middleware chain)
        const avatarPath = (req as any).processedAvatarPath as
            | string
            | undefined;
        if (avatarPath) {
            // Delete the previous avatar file from disk if one existed
            const current = await prisma.user.findUnique({
                where: { id: userId },
                select: { avatar: true },
            });
            if (current?.avatar) deleteAvatarFile(current.avatar);

            data.avatar = avatarPath;
        }

        if (Object.keys(data).length === 0) {
            res.status(400).json({ message: "No fields to update" });
            return;
        }

        const updated = await prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                email: true,
                dob: true,
                avatar: true,
                createdAt: true,
            },
        });

        res.json({ user: updated });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// ─── DELETE /api/users/me ─────────────────────────────────────────────────────
export const deleteMe = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user!.id;

        // Clean up avatar from disk before removing the record
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { avatar: true },
        });
        if (user?.avatar) deleteAvatarFile(user.avatar);

        // Cascade-delete tasks via Prisma's relation handler
        await prisma.task.deleteMany({ where: { userId } });
        await prisma.user.delete({ where: { id: userId } });

        res.json({ message: "Account deleted successfully" });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
