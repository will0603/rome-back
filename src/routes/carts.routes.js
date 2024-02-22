import { Router } from "express";
import { getCartByUser, getCarts } from "../controllers/carts.controller.js";
const router = Router();

router.get("/carts", getCarts);
router.get("/carts/:id", getCartByUser);

export default router;
