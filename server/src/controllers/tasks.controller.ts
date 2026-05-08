import type { Response } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";
import { deleteImageFile } from "../lib/upload";
import { startOfWeek, endOfWeek, subWeeks, eachDayOfInterval, format } from "date-fns";


const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required").max(200),
    description: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.string().date().optional().nullable(),
    category: z.string().optional().nullable(),
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

//get Task
export const getTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await prisma.task.findFirst({
            where: { id: req.params.id as string, userId: req.user?.id },
        })

        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.json({ task });

    } catch (error) {
        console.error("Error getting task");
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

        if (!req.user || !req.user.id) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const task = await prisma.task.create({
            data: {
                title,
                description: description ?? null,
                ...(priority && { priority }),
                category: category ?? null,
                dueDate: dueDate ? new Date(dueDate) : new Date(),
                imageUrl,
                userId: req.user.id,
            }
        })

        res.status(201).json({ task });
    } catch (err) {
        console.error("Error creating task : ", err);
        res.status(500).json({ error: "Internal server error" })

    }
}

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const existing = await prisma.task.findFirst({
            where: { id: req.params.id as string, userId: req.user?.id! },
        })

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

    } catch (err) {
        console.error("Update task error : ", err);
        res.status(500).json({ error: "Internal server error" })

    }
}

//delete a task
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await prisma.task.findFirst({
            where: { id: req.params.id as string, userId: req.user?.id! },
        })

        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        //delete the associated image file if its exists
        if (task.imageUrl) {
            deleteImageFile(task.imageUrl);
        }
        await prisma.task.delete({ where: { id: task.id } });
        res.json({ message: "Task deleted successfully" });

    } catch (err) {
        console.error("Delete task error : ", err);
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
                status: task.status === "PENDING" ? "COMPLETED" : "PENDING",
            }
        });

        res.json({ task: updated });
    } catch (error) {
        console.error("Toggle task error : ", error);
        res.status(500).json({ error: "Internal server error " });
    }
}

// ── GET /api/tasks/stats/weekly ──────────────────────────────────────────────
export const getWeeklyStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const weekParam = (req.query.week as string) ?? "current";

        // Determine the Sunday-Saturday range for the requested week
        const now = new Date();
        const baseDate = weekParam === "last" ? subWeeks(now, 1) : now;
        const weekStart = startOfWeek(baseDate, { weekStartsOn: 0 }); // Sunday
        const weekEnd = endOfWeek(baseDate, { weekStartsOn: 0 });   // Saturday

        // Fetch all tasks (any status) whose dueDate falls in the week
        const tasks = await prisma.task.findMany({
            where: {
                userId: req.user!.id,
                dueDate: { gte: weekStart, lte: weekEnd },
            },
            select: { dueDate: true },
        });

        // Build a count map keyed by "yyyy-MM-dd"
        const countMap: Record<string, number> = {};
        for (const task of tasks) {
            const key = format(task.dueDate, "yyyy-MM-dd");
            countMap[key] = (countMap[key] ?? 0) + 1;
        }

        // Generate the full 7-day array Sun → Sat
        const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
        const stats = days.map((date) => ({
            day: format(date, "EEEEE"),          // "S", "M", "T" …
            fullDay: format(date, "EEE"),        // "Sun", "Mon" … (for tooltip)
            date: format(date, "yyyy-MM-dd"),
            count: countMap[format(date, "yyyy-MM-dd")] ?? 0,
        }));

        res.json({ stats, weekStart: weekStart.toISOString(), weekEnd: weekEnd.toISOString() });
    } catch (err) {
        console.error("Weekly stats error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

