import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middlewares/validationMiddleware.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", authenticateUser, logout);

export default router;
