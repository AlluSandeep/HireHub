const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  applyJob,
} = require("../controllers/applicationController");

router.post(
  "/:jobId",
  authMiddleware,
  roleMiddleware("candidate"),
  applyJob
);

module.exports = router;