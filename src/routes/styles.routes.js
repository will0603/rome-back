import { Router } from "express";
import {
  createStyle,
  getStyles,
  updateStyle,
  getOneStyle,
} from "../controllers/styles.controller.js";
const router = Router();

router.get("/styles", getStyles);
router.get("/styles/:id", getOneStyle);
router.put("/styles/:id", updateStyle);
router.post("/styles", createStyle);

export default router;
