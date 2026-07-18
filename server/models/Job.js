const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
      default: "Full-Time",
    },

    skills: [
      {
        type: String,
      },
    ],

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);