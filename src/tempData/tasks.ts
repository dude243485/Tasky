import { type Task } from "../types/taskTypes";

export const dummyTasks: Task[] = [
    {
        id: "1",
        title: "Complete Project Proposal",
        description: "Draft the initial project proposal for the client including timeline and budget.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
        dueDate: new Date("2026-03-01").toISOString(),
        category: "work",
        priority: "high",
        status: "pending",
        createdAt: new Date("2026-02-20").toISOString(),
        updatedAt: new Date("2026-02-24").toISOString()
    },
    {
        id: "2",
        title: "Buy Groceries",
        description: "Pick up milk, eggs, bread, and fruits from the local market.",
        dueDate: new Date("2026-02-25").toISOString(),
        category: "nutrition",
        priority: "medium",
        status: "pending",
        createdAt: new Date("2026-02-23").toISOString(),
        updatedAt: new Date("2026-02-23").toISOString()
    },
    {
        id: "3",
        title: "Morning Yoga session",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
        dueDate: new Date("2026-02-25T07:00:00").toISOString(),
        category: "health",
        priority: "low",
        status: "completed",
        createdAt: new Date("2026-02-24").toISOString(),
        updatedAt: new Date("2026-02-24").toISOString()
    },
    {
        id: "4",
        title: "Review Backend Codebase",
        description: "Perform a deep dive into the API endpoints and optimize database queries.",
        dueDate: new Date("2026-03-10").toISOString(),
        category: "work",
        priority: "high",
        status: "pending",
        createdAt: new Date("2026-02-22").toISOString(),
        updatedAt: new Date("2026-02-22").toISOString()
    },
    {
        id: "5",
        title: "Book Weekend Trip",
        image: "https://images.unsplash.com/photo-1500835595306-b33346b0a7c4?auto=format&fit=crop&w=800&q=80",
        description: "Research hotels and flights for the upcoming weekend getaway to the mountains.",
        dueDate: new Date("2026-02-28").toISOString(),
        category: "social",
        priority: "medium",
        status: "pending",
        createdAt: new Date("2026-02-21").toISOString(),
        updatedAt: new Date("2026-02-24").toISOString()
    },
    {
        id: "6",
        title: "Finish Reading 'Atomic Habits'",
        dueDate: new Date("2026-03-15").toISOString(),
        category: "social",
        priority: "low",
        status: "pending",
        createdAt: new Date("2026-01-15").toISOString(),
        updatedAt: new Date("2026-02-20").toISOString()
    },
    {
        id: "7",
        title: "Quarterly Tax Filing",
        description: "Organize receipts and submit quarterly tax documents to the accountant.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
        dueDate: new Date("2026-03-31").toISOString(),
        category: "finance",
        priority: "high",
        status: "pending",
        createdAt: new Date("2026-02-01").toISOString(),
        updatedAt: new Date("2026-02-01").toISOString()
    },
    {
        id: "8",
        title: "Car Maintenance",
        description: "Take the car for its regular oil change and tire rotation.",
        dueDate: new Date("2026-03-05").toISOString(),
        category: "task",
        priority: "medium",
        status: "pending",
        createdAt: new Date("2026-02-23").toISOString(),
        updatedAt: new Date("2026-02-23").toISOString()
    },
    {
        id: "9",
        title: "Update Portfolio Website",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        description: "Add recent projects and update the resume on the personal portfolio.",
        dueDate: new Date("2026-04-10").toISOString(),
        category: "work",
        priority: "low",
        status: "pending",
        createdAt: new Date("2026-02-24").toISOString(),
        updatedAt: new Date("2026-02-24").toISOString()
    },
    {
        id: "10",
        title: "Pay Utility Bills",
        dueDate: new Date("2026-02-28").toISOString(),
        category: "finance",
        priority: "high",
        status: "pending",
        createdAt: new Date("2026-02-15").toISOString(),
        updatedAt: new Date("2026-02-24").toISOString()
    },
    {
        id: "11",
        title: "Prepare for Team Sync",
        description: "Gather updates from the development team for the weekly sync meeting.",
        dueDate: new Date("2026-02-26").toISOString(),
        category: "work",
        priority: "medium",
        status: "pending",
        createdAt: new Date("2026-02-24").toISOString(),
        updatedAt: new Date("2026-02-24").toISOString()
    },
    {
        id: "12",
        title: "Dinner with Friends",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
        dueDate: new Date("2026-02-27T19:00:00").toISOString(),
        category: "social",
        priority: "low",
        status: "pending",
        createdAt: new Date("2026-02-22").toISOString(),
        updatedAt: new Date("2026-02-22").toISOString()
    },
    {
        id: "13",
        title: "Renew Gym Membership",
        dueDate: new Date("2026-03-01").toISOString(),
        category: "health",
        priority: "medium",
        status: "pending",
        createdAt: new Date("2026-02-10").toISOString(),
        updatedAt: new Date("2026-02-10").toISOString()
    },
    {
        id: "14",
        title: "Garden Upkeep",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
        description: "Mow the lawn and trim the hedges this weekend.",
        dueDate: new Date("2026-03-02").toISOString(),
        category: "social",
        priority: "low",
        status: "pending",
        createdAt: new Date("2026-02-23").toISOString(),
        updatedAt: new Date("2026-02-23").toISOString()
    },
    {
        id: "15",
        title: "Analyze Market Trends",
        description: "Research current market trends for the new product launch.",
        dueDate: new Date("2026-03-20").toISOString(),
        category: "work",
        priority: "high",
        status: "pending",
        createdAt: new Date("2026-02-24").toISOString(),
        updatedAt: new Date("2026-02-24").toISOString()
    }
];
