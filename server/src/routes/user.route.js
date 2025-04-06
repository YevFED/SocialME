import express from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";

import { authenticateToken } from "../lib/utils.js";

const router = express.Router();

router.get("/getuser", authenticateToken, getUser);

router.put("/updateuser", authenticateToken, updateUser);

export default router;
