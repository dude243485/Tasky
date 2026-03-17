import type { Response } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";
import { deleteImageFile } from "../lib/upload";

const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required").max(200),
    description: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.string().date().optional(),
    category: z.string().optional(),
})

const updateTaskSchema = createTaskSchema.partial().extend({
    status: z.enum(["PENDING", "COMPLETED"]).optional(),
})

const querySchema = z.object({
    dueDate: z.string().optional(),
    status: z.enum(["PENDING", "COMPLETED"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    category: z.string().optional(),
    search: z.string().optional(),
})

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const parsed = querySchema.safeParse(req.query);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.issues[0]?.message });
            return;
        }

        const { dueDate, status, priority, category, search } = parsed.data;

        const dueDateFilter = dueDate ? { dueDate: new Date(dueDate) } : {};

        const where = {
            userId: req.user?.id,
            ...(status && { status }),
            ...(priority && { priority }),
            ...(category && { category }),
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' as const } },
                    { description: { contains: search, mode: 'insensitive' as const } },
                ],
            }),
            ...dueDateFilter,
        };

        const tasks = await prisma.task.findMany({
            where,
            orderBy: [{ status: "asc" }, { dueDate: "asc" }]
        });

        res.json({ tasks });

    } catch (err) {
        console.error("Get tasks error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
}