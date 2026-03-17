import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.route.js";

dotenv.config();

const app = express();

//middleware
// app.use(cors());
app.use(cors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


//Routes
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timeStamp: new Date().toISOString() });
})

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

// 404 Handler 
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler 
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
})

