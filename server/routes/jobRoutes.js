const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const { jobValidation } = require("../validations/jobValidation");
const validationMiddleware = require("../middleware/validationMiddleware");

// Create Job
router.post(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  jobValidation,
  validationMiddleware,
  createJob
);

// Get All Jobs
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.get(
  "/my-jobs",
  authMiddleware,
  roleMiddleware("recruiter"),
  getMyJobs
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateJob
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  deleteJob
);

module.exports = router;