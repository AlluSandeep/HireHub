import api from "./api";

export const applyJob = async (jobId, formData) => {
  const response = await api.post(`/applications/${jobId}`, formData);
  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my");
  return response.data;
};

export const getApplicantsByJob = async (jobId) => {
  const response = await api.get(`/applications/job/${jobId}`);
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.put(
    `/applications/${applicationId}/status`,
    { status }
  );
  return response.data;
};

export const getCandidateResume = async (candidateId) => {
  const response = await api.get(
    `/applications/candidate/${candidateId}/resume`
  );
  return response.data;
};