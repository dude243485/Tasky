import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.routes";
import tasksRoutes from "./routes/tasks.routes";
import userRoutes from "./routes/user.routes";

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
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



//routes
app.get("/health", (req, res) => {
    res.json({ status: "ok", timeStamp: new Date().toISOString() })
})

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", userRoutes);

//404 handler
app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
})

//global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled error: ", err);
    res.status(500).json({ error: "Internal server error" });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})