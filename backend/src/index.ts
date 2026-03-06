import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

//Routes
app.use("/api/auth", authRoutes);

//root
app.get("/", (req, res) => {
    res.send("You hit the servrr");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
})

