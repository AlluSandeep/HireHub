import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">

      <DashboardSidebar />

      <div className="flex-1">

        <DashboardNavbar />

        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;