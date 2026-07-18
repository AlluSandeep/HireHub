const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    companyWebsite: {
      type: String,
      default: "",
    },
    companyLocation: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      default: "",
    },
    companyLogo: {
      type: String,
      default: "",
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);