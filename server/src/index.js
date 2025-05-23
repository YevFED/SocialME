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

// app.use(
//   cors({
//     origin: ["http://localhost:5173/", "https://social-me-navy.vercel.app/"],
//     credentials: true,
//   })
// );

app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`server started on port: ` + PORT);
  connectDB();
});
