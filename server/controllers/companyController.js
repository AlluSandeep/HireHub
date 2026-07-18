const Company = require("../models/Company");

// Create Company
exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      recruiter: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Companies
exports.getMyCompanies = async (req, res) => {
  try {
    const companies = await Company.find({
      recruiter: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Company By ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Company
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      {
        _id: req.params.id,
        recruiter: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({
      _id: req.params.id,
      recruiter: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};