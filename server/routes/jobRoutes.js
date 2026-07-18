const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob
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
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateJob
);

module.exports = router;