import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  getOneProduct,
} from "../controllers/products.controller.js";
const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getOneProduct);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id");
router.get("/products/:id");

export default router;
