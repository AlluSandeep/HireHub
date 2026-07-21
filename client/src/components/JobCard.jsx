import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-5 shadow hover:shadow-lg transition">

      <h2 className="text-xl font-bold">
        {job.title}
      </h2>

      {/* Company Name */}
      <p className="text-gray-600">
        {job.company?.companyName}
      </p>

      {/* Company Location */}
      <p>
        {job.company?.companyLocation}
      </p>

      {/* Job Location */}
      <p>
        {job.location}
      </p>

      <p>
        {job.jobType}
      </p>

      <p className="font-semibold text-green-600">
        ₹ {job.salary}
      </p>

      <Link
        to={`/jobs/${job._id}`}
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Details
      </Link>

    </div>
  );
};

export default JobCard;