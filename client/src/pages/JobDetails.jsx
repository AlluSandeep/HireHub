import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import Loader from "../components/Loader";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data.job);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <Loader />;

  if (!job) {
    return (
      <h2 className="text-center mt-10">
        Job Not Found
      </h2>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <div className="border rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-4">
          {job.title}
        </h1>

        {/* Company Details */}
        <p className="text-xl text-gray-600">
          {job.company?.companyName}
        </p>

        <p className="text-gray-500 mb-4">
          {job.company?.companyLocation}
        </p>

        {job.company?.companyWebsite && (
          <p className="mb-4">
            <strong>Website:</strong>{" "}
            <a
              href={job.company.companyWebsite}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {job.company.companyWebsite}
            </a>
          </p>
        )}

        <div className="mt-6 space-y-2">

          <p>
            <strong>Location:</strong> {job.location}
          </p>

          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>

          <p>
            <strong>Salary:</strong> ₹ {job.salary}
          </p>

          <p>
            <strong>Experience:</strong> {job.experience}
          </p>

        </div>

        <div className="mt-8">

          <h2 className="text-2xl font-semibold mb-3">
            Job Description
          </h2>

          <p>{job.description}</p>

        </div>

        <button
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Apply Now
        </button>

      </div>
    </div>
  );
};

export default JobDetails;