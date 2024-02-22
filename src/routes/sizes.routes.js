import { Router } from "express";
import { getSizes, createSize } from "../controllers/sizes.controller.js";
const router = Router();

router.get("/sizes", getSizes);
router.post("/sizes", createSize);

export default router;
