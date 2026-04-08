import axios from "axios";


//ensure backend url matches
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const apiClient = axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type" : "application/json",
    },
});

//attach the authorization token to each request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

// Global error handling (e.g. 401 → redirect to login)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default apiClient;