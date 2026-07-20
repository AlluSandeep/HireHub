const User = require("../models/User");
    const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

exports.uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume"
      });
    }

    const user = await User.findById(req.user.id);

    // Delete old resume if exists
    if (user.resumePublicId) {
      await cloudinary.uploader.destroy(user.resumePublicId, {
        resource_type: "raw"
      });
    }

    // Upload new resume
    const uploadResult = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "hirehub/resumes",
          resource_type: "raw"
        },
        (error, result) => {

          if (error) return reject(error);

          resolve(result);

        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);

    });

    user.resume = uploadResult.secure_url;
    user.resumePublicId = uploadResult.public_id;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: user.resume
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};