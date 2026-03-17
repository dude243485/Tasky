import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

//middleware
app.use(cors({
    origin: process.env.CLIENT_URL ?? "https://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//static files

//404 handler

//routes
app.get("/health", (req, res) => {
    res.json({ status: "ok", timeStamp: new Date().toISOString() })
})

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})