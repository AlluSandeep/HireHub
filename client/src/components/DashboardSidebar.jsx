import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const DashboardSidebar = () => {

  const { user } = useAuth();
  return (
    <aside className="w-64 bg-slate-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        HireHub
      </h2>

      <nav className="space-y-3">

        <NavLink
          to="/recruiter/dashboard"
          className="block hover:text-blue-400"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/recruiter/jobs"
          className="block hover:text-blue-400"
        >
          My Jobs
        </NavLink>

        <NavLink
          to="/recruiter/post-job"
          className="block hover:text-blue-400"
        >
          Post Job
        </NavLink>


<NavLink to="/recruiter/companies">
  My Companies
</NavLink>

<NavLink to="/recruiter/company/create">
  Create Company
</NavLink>

      </nav>

    </aside>
  );
};

export default DashboardSidebar;