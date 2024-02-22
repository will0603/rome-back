import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  getOneCategory,
} from "../controllers/categories.controller.js";
const router = Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getOneCategory);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id");

export default router;
