import { Router } from "express";
import { getImages } from "../controllers/images.controller.js";
const router = Router();

router.get("/images", getImages);

export default router;
