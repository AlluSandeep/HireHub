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

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const keyword = req.query.keyword || "";

        const location = req.query.location || "";

        const experience = req.query.experience;

        let filter = {};

        if (keyword) {

            filter.title = {
                $regex: keyword,
                $options: "i"
            };

        }

        if (location) {

            filter.location = {
                $regex: location,
                $options: "i"
            };

        }

        if (experience) {

            filter.experience = {
                $gte: Number(experience)
            };

        }

        const jobs = await Job.find(filter)
            .populate("company", "companyName companyLocation")
            .populate("recruiter", "fullName")
            .skip(skip)
            .limit(limit)
            .sort({
                createdAt: -1
            });

        const totalJobs = await Job.countDocuments(filter);

        res.status(200).json({

            success: true,

            page,

            totalPages: Math.ceil(totalJobs / limit),

            totalJobs,

            jobs

        });

    }

    catch (error) {

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

// Get Recruiter's Jobs
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user.id,
    })
      .populate("company");

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

exports.deleteJob = async (req, res) => {
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

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};