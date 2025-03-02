import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

dotenv.config();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server started on port: ` + PORT);
  connectDB();
});
