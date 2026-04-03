import { type Response } from "express";
import { z } from "zod";
import { type AuthRequest } from "../middleware/auth.middleware.js";
import { prisma } from "../lib/prisma.js";
import { deleteImageFile } from "../lib/upload.js";

const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required").max(200),
    description: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.string().date().optional().nullable(),
    category: z.string().optional().nullable(),
});

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
            // res.status(400).json({ error: parsed.error.issues[0].message });
            res.status(400).json({ error: "Some shit went wrong, figure it out" });

            return;
        }

        const { dueDate, status, priority, category, search } = parsed.data;

        //for dueDate
        const dueDateFilter = dueDate ? { dueDate: new Date(dueDate) } : {};

        const where = {
            userId: req.user?.id!,
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
        }

        const tasks = await prisma.task.findMany({
            where,
            orderBy: [{ status: "asc" }, { dueDate: "asc" }]
        });

        res.json({ tasks });

    } catch (error) {
        console.error("Get tasks error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }

}



//get Task
export const getTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await prisma.task.findFirst({
            where: { id: req.params.id as string, userId: req.user?.id! },
        });

        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.json({ task });
    } catch (error) {
        console.error("get task error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//create a new task
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const parsed = createTaskSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.issues[0]?.message });
            return;
        }

        const { dueDate, title, description, priority, category } = parsed.data;
        const imageUrl = (req as any).processedImagePath ?? null;

        const task = await prisma.task.create({
            data: {
                title,
                description: description ?? null,
                ...(priority && { priority }),
                category: category ?? null,
                dueDate: dueDate ? new Date(dueDate) : new Date(),
                imageUrl,
                userId: req.user?.id!,
            }
        })

        res.status(201).json({ task });
    } catch (error) {
        console.error("Create task error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//update a task
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const existing = await prisma.task.findFirst({
            where: { id: req.params.id as string, userId: req.user?.id! },
        });

        if (!existing) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        const parsed = updateTaskSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.issues[0]?.message });
            return;
        }

        const { title, description, priority, dueDate, category, status } = parsed.data;
        const newImageUrl = (req as any).processedImagePath ?? undefined;

        // If a new image was uploaded, delete the old one
        if (newImageUrl && existing.imageUrl) {
            deleteImageFile(existing.imageUrl);
        }

        const task = await prisma.task.update({
            where: { id: existing.id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description: description ?? null }),
                ...(priority !== undefined && { priority }),
                ...(category !== undefined && { category: category ?? null }),
                ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : new Date() }),
                ...(status !== undefined && { status }),
                ...(newImageUrl !== undefined && { imageUrl: newImageUrl }),
            },
        });

        res.json({ task });
    } catch (error) {
        console.error("Update task error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//delete a task
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await prisma.task.findFirst({
            where: { id: req.params.id as string, userId: req.user?.id! },
        });

        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        // Delete the associated image file if it exists
        if (task.imageUrl) {
            deleteImageFile(task.imageUrl);
        }

        await prisma.task.delete({ where: { id: task.id } });

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//toggle task completed status
export const toggleTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await prisma.task.findFirst({
            where: { id: req.params.id as string, userId: req.user?.id! },
        });

        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        const updated = await prisma.task.update({
            where: { id: task.id },
            data: {
                status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
            },
        });

        res.json({ task: updated });
    } catch (error) {
        console.error("Toggle task error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}