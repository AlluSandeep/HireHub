const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  register,
  login,
  getProfile,
  adminDashboard,
} = require("../controllers/authController");

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/profile", authMiddleware, getProfile);

// Admin Only Route
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  adminDashboard
);

module.exports = router;