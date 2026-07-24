const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
  getProfile,
} = require("../controllers/userController");

// Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// Upload Resume
router.post(
  "/resume",
  authMiddleware,
  roleMiddleware("candidate"),
  upload.single("resume"),
  uploadResume
);

module.exports = router;