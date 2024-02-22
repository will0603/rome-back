import { Router } from "express";
import {
  getOrders,
  getOrdersByUser,
  getOneOrder,
  createOrder,
} from "../controllers/orders.controller.js";
const router = Router();

router.get("/orders", getOrders);
router.get("/orders/:id", getOneOrder);
router.get("/orders/user/:id", getOrdersByUser);
router.post("/orders", createOrder);

export default router;
