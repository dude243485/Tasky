import apiClient from "./apiClient";

export const getTasks = (params?: { search?: string; status?: string; priority?: string; category?: string; dueDate?: string }) => {
    return apiClient.get("/api/tasks", { params });
};

export const getTask = (id: string) => {
    return apiClient.get(`/api/tasks/${id}`);
};

export const createTask = (formData: FormData) => {
    return apiClient.post("/api/tasks", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateTask = (id: string, formData: FormData) => {
    return apiClient.patch(`/api/tasks/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const toggleTask = (id: string) => {
    return apiClient.patch(`/api/tasks/${id}/toggle`);
};

export const deleteTask = (id: string) => {
    return apiClient.delete(`/api/tasks/${id}`);
};
