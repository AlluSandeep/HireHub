const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  applyJob,
  getMyApplications,
  getApplicantsByJob,
  updateApplicationStatus
} = require("../controllers/applicationController");

router.post(
  "/:jobId",
  authMiddleware,
  roleMiddleware("candidate"),
  applyJob
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("candidate"),
  getMyApplications
);

router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("recruiter"),
  getApplicantsByJob
);

router.put(
  "/:applicationId/status",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateApplicationStatus
);

module.exports = router;