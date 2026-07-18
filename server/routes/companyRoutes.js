const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createCompany,
  getMyCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

router.post("/", authMiddleware, roleMiddleware("recruiter"), createCompany);

router.get("/my-companies", authMiddleware, roleMiddleware("recruiter"), getMyCompanies);

router.get("/:id", authMiddleware, roleMiddleware("recruiter"), getCompanyById);

router.put("/:id", authMiddleware, roleMiddleware("recruiter"), updateCompany);

router.delete("/:id", authMiddleware, roleMiddleware("recruiter"), deleteCompany);

module.exports = router;