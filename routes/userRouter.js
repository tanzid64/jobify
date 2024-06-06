import { Router } from "express";
const router = Router();
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

router.get("/current-user", getCurrentUser);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  updateUser
);
router.get(
  "/admin/app-sats",
  authorizePermissions("admin"),
  getApplicationStats
);

export default router;
