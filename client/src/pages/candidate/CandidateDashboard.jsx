import { Link } from "react-router-dom";

const CandidateDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-2">
        Candidate Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Welcome to HireHub Candidate Panel.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          to="/candidate/applications"
          className="border rounded-lg p-6 shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            My Applications
          </h2>

          <p className="text-gray-500 mt-2">
            View jobs you have applied for.
          </p>
        </Link>

        <Link
          to="/candidate/saved-jobs"
          className="border rounded-lg p-6 shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            Saved Jobs
          </h2>

          <p className="text-gray-500 mt-2">
            View your saved jobs.
          </p>
        </Link>

        <Link
          to="/candidate/profile"
          className="border rounded-lg p-6 shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            Profile
          </h2>

          <p className="text-gray-500 mt-2">
            Manage your profile.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default CandidateDashboard;