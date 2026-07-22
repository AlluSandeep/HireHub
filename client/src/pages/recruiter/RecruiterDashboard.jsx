import {
  Briefcase,
  Users,
  CircleCheck,
  Clock,
} from "lucide-react";

import StatCard from "../../components/StatCard";

const RecruiterDashboard = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Recruiter Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Jobs"
          value="12"
          icon={Briefcase}
          color="bg-blue-600"
        />

        <StatCard
          title="Applicants"
          value="245"
          icon={Users}
          color="bg-green-600"
        />

        <StatCard
          title="Active Jobs"
          value="8"
          icon={CircleCheck}
          color="bg-purple-600"
        />

        <StatCard
          title="Pending Jobs"
          value="4"
          icon={Clock}
          color="bg-orange-500"
        />

      </div>

    </div>
  );
};

export default RecruiterDashboard;