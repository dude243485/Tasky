export interface Task {
    id: string;
    title: string;
    image ?: string;
    description?: string;
    dueDate: Date;
    category : string;
    priority: "low" | "medium" | "high";
    status: "pending" | "completed";
    createdAt: Date;
    updatedAt: Date;
}