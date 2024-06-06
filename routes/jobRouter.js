import { Router } from "express";
const router = Router();
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobcontroller.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middlewares/validationMiddleware.js";
import { checkForTestUser } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJobById)
  .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
