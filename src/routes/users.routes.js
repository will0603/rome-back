import { Router } from "express";
import {
  createUser,
  getOneUser,
  loginUser,
  logoutUser,
  getAllUsers,
} from "../controllers/users.controller.js";
const router = Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.get("/users/:id", getOneUser);
router.put("/users", loginUser);
router.put("/users/:id", logoutUser);

export default router;
