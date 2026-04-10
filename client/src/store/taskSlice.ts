import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Task } from "../types/taskTypes";
import * as taskService from "../services/taskService";

interface TasksState {
    items: Task[];
    loading: boolean;
    error: string | null;
}

interface FilterParams {
    search?: string;
    status?: string;
    priority?: string;
    category?: string;
    dueDate?: string;
}

// Map backend task to frontend task structure
const mapTask = (task: any): Task => ({
    id: task.id,
    title: task.title,
    image: task.imageUrl || undefined,
    description: task.description || undefined,
    dueDate: task.dueDate,
    category: task.category || "Task",
    priority: task.priority?.toLowerCase() as "low" | "medium" | "high",
    status: task.status?.toLowerCase() as "pending" | "completed",
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
});

const initialState: TasksState = {
    items: [],
    loading: false,
    error: null,
};

export const getTasks = createAsyncThunk(
    "tasks/getTasks",
    async (filter: FilterParams | undefined, { rejectWithValue }) => {
        try {
            const res = await taskService.getTasks(filter);
            return res.data.tasks.map(mapTask);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || err.response?.data?.message || "Task fetch failed!");
        }
    }
);

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const res = await taskService.createTask(formData);
            return mapTask(res.data.task);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || err.response?.data?.message || "Failed to create task");
        }
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
        try {
            const res = await taskService.updateTask(id, formData);
            return mapTask(res.data.task);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || err.response?.data?.message || "Failed to update task");
        }
    }
);

export const toggleTaskStatus = createAsyncThunk(
    "tasks/toggleTaskStatus",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await taskService.toggleTask(id);
            return mapTask(res.data.task);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || err.response?.data?.message || "Failed to toggle task");
        }
    }
);

export const deleteTaskAction = createAsyncThunk(
    "tasks/deleteTask",
    async (id: string, { rejectWithValue }) => {
        try {
            await taskService.deleteTask(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || err.response?.data?.message || "Failed to delete task");
        }
    }
);

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // Reducers for optimistic updates or local state if needed (optional)
        addTaskLocal: (state, action: PayloadAction<Task>) => {
            state.items.push(action.payload);
        },
        toggleTaskLocal: (state, action: PayloadAction<string>) => {
            const task = state.items.find(t => t.id === action.payload);
            if (task) {
                task.status = task.status === "completed" ? "pending" : "completed";
            }
        },
        deleteTaskLocal: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(t => t.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            // getTasks
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // createTask
            .addCase(createTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // updateTask
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.items.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // toggleTaskStatus
            .addCase(toggleTaskStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // deleteTaskAction
            .addCase(deleteTaskAction.fulfilled, (state, action) => {
                state.items = state.items.filter(t => t.id !== action.payload);
            });
    }
});

export const { addTaskLocal, toggleTaskLocal, deleteTaskLocal } = tasksSlice.actions;
export default tasksSlice.reducer;
