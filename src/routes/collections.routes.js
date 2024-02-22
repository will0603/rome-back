import { Router } from "express";
import {
  getCollections,
  createCollection,
  updateCollection,
} from "../controllers/collections.controller.js";
const router = Router();

router.get("/collections", getCollections);
router.post("/collections", createCollection);
router.put("/collections/:id", updateCollection);
router.delete("/collections/:id");

export default router;
