const Company = require("../models/Company");
const Job = require("../models/Job");

exports.createJob = async (req, res) => {

    try {

        const company = await Company.findOne({
            _id: req.body.company,
            recruiter: req.user.id
        });

        if (!company) {

            return res.status(404).json({
                success: false,
                message: "Company not found"
            });

        }

        const job = await Job.create({

            ...req.body,

            recruiter: req.user.id

        });

        res.status(201).json({

            success: true,

            message: "Job created successfully",

            job

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getAllJobs = async (req, res) => {

    try {

        const jobs = await Job.find()
            .populate("company", "companyName companyLocation companyLogo")
            .populate("recruiter", "fullName email");

        res.status(200).json({
            success: true,
            totalJobs: jobs.length,
            jobs
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getJobById = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id)
      .populate("company", "companyName companyLocation companyWebsite companyLogo")
      .populate("recruiter", "fullName email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.updateJob = async (req, res) => {
  try {

    const job = await Job.findOne({
      _id: req.params.id,
      recruiter: req.user.id
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};