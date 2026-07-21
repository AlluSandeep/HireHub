import "./services/api";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

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

      {/* Recruiter */}
      <Route
  path="/recruiter/dashboard"
  element={
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <RecruiterDashboard />
    </ProtectedRoute>
  }
/>

      <Route
  path="/candidate/dashboard"
  element={
    <ProtectedRoute allowedRoles={["candidate"]}>
      <CandidateDashboard />
    </ProtectedRoute>
  }
/>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

      <Route
  path="/unauthorized"
  element={<Unauthorized />}
/>
    </Routes>
  );
}

export default App;