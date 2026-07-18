const { body } = require("express-validator");

exports.jobValidation = [
  body("title").notEmpty().withMessage("Job title is required"),

  body("description").notEmpty().withMessage("Description is required"),

  body("company").notEmpty().withMessage("Company is required"),

  body("location").notEmpty().withMessage("Location is required"),

  body("salary").isNumeric().withMessage("Salary must be number"),
];