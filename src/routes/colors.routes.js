import { Router } from "express";
import { getColors, createColor } from "../controllers/colors.controller.js";
const router = Router();

router.get("/colors", getColors);
router.post("/colors", createColor);

export default router;
