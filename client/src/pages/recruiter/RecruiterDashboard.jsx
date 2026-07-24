import {
  Briefcase,
  Users,
  CircleCheck,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getRecruiterStats,
  getMyJobs,
} from "../../services/jobService";

import {
  getRecentApplicants,
} from "../../services/applicationService";

import StatCard from "../../components/StatCard";

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    pendingJobs: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);

  // Dashboard Stats
  const fetchStats = async () => {
    try {
      const data = await getRecruiterStats();
      setStats(data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  // Recent Jobs
  const fetchRecentJobs = async () => {
    try {
      const data = await getMyJobs();
      setRecentJobs(data.jobs.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  // Recent Applicants
  const fetchApplicants = async () => {
    try {
      const data = await getRecentApplicants();
      setRecentApplicants(data.applicants);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentJobs();
    fetchApplicants();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Recruiter Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon={Briefcase}
          color="bg-blue-600"
        />

        <StatCard
          title="Applicants"
          value={stats.totalApplications}
          icon={Users}
          color="bg-green-600"
        />

        <StatCard
          title="Active Jobs"
          value={stats.activeJobs}
          icon={CircleCheck}
          color="bg-purple-600"
        />

        <StatCard
          title="Pending Jobs"
          value={stats.pendingJobs}
          icon={Clock}
          color="bg-orange-500"
        />

      </div>

      {/* Recent Jobs */}
      <div className="mt-10 bg-white rounded-xl shadow-lg border border-gray-200 p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Recent Jobs
        </h2>

        {recentJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No Jobs Posted Yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">
                    Job Title
                  </th>

                  <th className="border p-3 text-left">
                    Location
                  </th>

                  <th className="border p-3 text-left">
                    Type
                  </th>

                  <th className="border p-3 text-center">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">

                    <td className="border p-3">
                      {job.title}
                    </td>

                    <td className="border p-3">
                      {job.location}
                    </td>

                    <td className="border p-3">
                      {job.jobType}
                    </td>

                    <td className="border p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          job.status
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {job.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* Recent Applicants */}
      <div className="mt-10 bg-white rounded-xl shadow-lg border border-gray-200 p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Latest Applicants
        </h2>

        {recentApplicants.length === 0 ? (
          <p className="text-center text-gray-500">
            No Applicants Yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-100">

                  <th className="border p-3">
                    Candidate
                  </th>

                  <th className="border p-3">
                    Email
                  </th>

                  <th className="border p-3">
                    Job
                  </th>

                  <th className="border p-3">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>

                {recentApplicants.map((item) => (
                  <tr key={item._id}>

                    <td className="border p-3">
                      {item.candidate?.fullName}
                    </td>

                    <td className="border p-3">
                      {item.candidate?.email}
                    </td>

                    <td className="border p-3">
                      {item.job?.title}
                    </td>

                    <td className="border p-3">
                      {item.status}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
};

export default RecruiterDashboard;