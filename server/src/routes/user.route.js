import express from "express";
import { getUser } from "../controllers/user.controller.js";

import { authenticateToken } from "../lib/utils.js";
import { editUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/getuser", authenticateToken, getUser);

router.put("/updateuser", authenticateToken, editUser);

export default router;
