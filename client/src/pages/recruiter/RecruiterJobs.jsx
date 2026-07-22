import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyJobs, deleteJob } from "../../services/jobService";

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await deleteJob(id);
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Jobs</h1>

        <Link
          to="/recruiter/post-job"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Post Job
        </Link>
      </div>

      <table className="w-full border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Title</th>
            <th className="border p-3">Location</th>
            <th className="border p-3">Type</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td className="border p-3">{job.title}</td>
              <td className="border p-3">{job.location}</td>
              <td className="border p-3">{job.jobType}</td>
              <td className="border p-3">
                {job.status ? "Active" : "Inactive"}
              </td>

              <td className="border p-3 space-x-2">
                <Link
                  to={`/recruiter/jobs/edit/${job._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>

                <Link
  to={`/recruiter/jobs/${job._id}/applicants`}
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  Applicants
</Link>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {jobs.length === 0 && (
        <p className="text-center mt-6">
          No jobs posted yet.
        </p>
      )}
    </div>
  );
};

export default RecruiterJobs;