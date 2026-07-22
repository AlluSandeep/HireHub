import api from "./api";

// Get all jobs
export const getAllJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

// Get single job
export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

// Create job
export const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

// Get recruiter jobs
export const getMyJobs = async () => {
  const response = await api.get("/jobs/my-jobs");
  return response.data;
};

// Delete job
export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};