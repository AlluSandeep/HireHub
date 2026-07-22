import { useAuth } from "../context/AuthContext";

const DashboardNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between">

      <h2 className="text-xl font-semibold">
        Recruiter Dashboard
      </h2>

      <span>
        Welcome, {user?.name}
      </span>

    </header>
  );
};

export default DashboardNavbar;