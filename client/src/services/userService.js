import api from "./api";

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