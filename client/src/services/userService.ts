import apiClient from "./apiClient";

export const updateProfile = (data: FormData) =>
  apiClient.patch("/api/users/me", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getUserInfo = () => apiClient.get("/api/users/me");
