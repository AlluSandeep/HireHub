import api from "./api";

// Upload Resume
export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post(
    "/users/resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get Logged-in User Profile
export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};