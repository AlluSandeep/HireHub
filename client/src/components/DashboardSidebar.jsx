import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardSidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-64 bg-slate-900 text-white p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">HireHub</h2>

      <nav className="space-y-3">

        {/* Recruiter Sidebar */}
        {user.role === "recruiter" && (
          <>
            <NavLink to="/recruiter/dashboard" className="block hover:text-blue-400">
              Dashboard
            </NavLink>

            <NavLink to="/recruiter/jobs" className="block hover:text-blue-400">
              My Jobs
            </NavLink>

            <NavLink to="/recruiter/post-job" className="block hover:text-blue-400">
              Post Job
            </NavLink>

            <NavLink to="/recruiter/companies" className="block hover:text-blue-400">
              My Companies
            </NavLink>

            <NavLink to="/recruiter/company/create" className="block hover:text-blue-400">
              Create Company
            </NavLink>
          </>
        )}

        {/* Candidate Sidebar */}
        {user.role === "candidate" && (
          <>
            <NavLink to="/candidate/dashboard" className="block hover:text-blue-400">
              Dashboard
            </NavLink>

            <NavLink to="/jobs" className="block hover:text-blue-400">
            Browse Jobs
            </NavLink>

            <NavLink to="/candidate/applications" className="block hover:text-blue-400">
              My Applications
            </NavLink>

            <NavLink to="/candidate/saved-jobs" className="block hover:text-blue-400">
              Saved Jobs
            </NavLink>

            <NavLink to="/candidate/profile" className="block hover:text-blue-400">
              Profile
            </NavLink>
          </>
        )}

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 py-2 rounded"
        >
          Logout
        </button>

      </nav>
    </aside>
  );
};

export default DashboardSidebar;