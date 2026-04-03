export interface Task {
    id: string;
    title: string;
    image?: string;
    description?: string;
    dueDate: string;
    category: string;
    priority: "low" | "medium" | "high";
    status: "pending" | "completed";
    createdAt: string;
    updatedAt: string;
}