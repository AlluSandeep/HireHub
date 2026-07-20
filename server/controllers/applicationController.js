const Application = require("../models/Application");
const Job = require("../models/Job");

exports.applyJob = async (req, res) => {
  try {

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getMyApplications = async (req, res) => {
  try {

    const applications = await Application.find({
      candidate: req.user.id
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "companyName companyLocation companyLogo"
        }
      });

    res.status(200).json({
      success: true,
      totalApplications: applications.length,
      applications
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.getApplicantsByJob = async (req, res) => {
  try {

    const { jobId } = req.params;

    // Check whether the job belongs to the logged-in recruiter
    const job = await Job.findOne({
      _id: jobId,
      recruiter: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized",
      });
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate("candidate", "fullName email")
      .populate("job", "title location");

    res.status(200).json({
      success: true,
      totalApplicants: applications.length,
      applications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {

    const { applicationId } = req.params;
    const { status } = req.body;

    // Check valid status
    const validStatus = ["Pending", "Reviewed", "Selected", "Rejected"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status"
      });
    }

    const application = await Application.findById(applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    // Verify recruiter owns this job
    if (application.job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const User = require("../models/User");

exports.getCandidateResume = async (req, res) => {
  try {

    const { candidateId } = req.params;

    const candidate = await User.findById(candidateId).select(
      "fullName email resume"
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    if (!candidate.resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not uploaded"
      });
    }

    res.status(200).json({
      success: true,
      candidate
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};