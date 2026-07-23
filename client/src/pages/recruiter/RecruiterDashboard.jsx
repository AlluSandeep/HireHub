import {
  Briefcase,
  Users,
  CircleCheck,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getRecruiterStats } from "../../services/jobService";

import StatCard from "../../components/StatCard";

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    pendingJobs: 0,
  });

  const fetchStats = async () => {
    try {
      const data = await getRecruiterStats();
      setStats(data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Recruiter Dashboard
      </h1>

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
    </div>
  );
};

export default RecruiterDashboard;