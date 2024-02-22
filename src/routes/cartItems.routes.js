import { Router } from "express";
import {
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartItems.controller.js";
const router = Router();

router.post("/cartItems", createCartItem);
router.put("/cartItems/:id", updateCartItem);
router.delete("/cartItems/:id", deleteCartItem);

export default router;
