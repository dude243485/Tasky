import apiClient from "./apiClient";

export const signup = (name : string,  email : string, password : string) => 
    apiClient.post("/api/auth/signup", { name, email, password});

export const signin = (email : string, password : string) => 
    apiClient.post("/api/auth/signin", { email, password} );

export const getGoogleAuthUrl = () => 
    apiClient.get("/api/auth/google");