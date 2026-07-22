import "./services/api";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import PostJob from "./pages/recruiter/PostJob";
import CreateCompany from "./pages/recruiter/CreateCompany";
import CompanyList from "./pages/recruiter/CompanyList";
import JobApplicants from "./pages/recruiter/JobApplicants";

import CandidateDashboard from "./pages/candidate/CandidateDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import MyApplications from "./pages/candidate/MyApplications";
import SavedJobs from "./pages/candidate/SavedJobs";
import Profile from "./pages/candidate/Profile";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Recruiter Routes */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RecruiterDashboard />} />
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="jobs" element={<RecruiterJobs />} />
        <Route path="post-job" element={<PostJob />} />
        <Route
  path="jobs/:jobId/applicants"
  element={<JobApplicants />}
/>

        {/* Company Routes */}
        <Route path="companies" element={<CompanyList />} />
        <Route path="company/create" element={<CreateCompany />} />
      </Route>

      {/* Candidate Routes */}
<Route
  path="/candidate"
  element={
    <ProtectedRoute allowedRoles={["candidate"]}>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<CandidateDashboard />} />
  <Route path="dashboard" element={<CandidateDashboard />} />
  <Route path="applications" element={<MyApplications />} />
  <Route path="saved-jobs" element={<SavedJobs />} />
  <Route path="profile" element={<Profile />} />
</Route>

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;