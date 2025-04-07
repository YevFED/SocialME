import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`server started on port: ` + PORT);
  connectDB();
});
