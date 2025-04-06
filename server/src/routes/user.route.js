import express from "express";
import { getUser } from "../controllers/user.controller.js";

import { authenticateToken } from "../lib/utils.js";

const router = express.Router();

router.get("/getuser", authenticateToken, getUser);

router.put("/changeInfo", authenticateToken);

export default router;
