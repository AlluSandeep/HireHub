import { useEffect, useState } from "react";
import { createJob } from "../../services/jobService";
import { getMyCompanies } from "../../services/companyService";

const PostJob = () => {
  const [companies, setCompanies] = useState([]);

const [formData, setFormData] = useState({
  title: "",
  description: "",
  company: "",
  location: "",
  salary: "",
  experience: 0,
  vacancies: 1,
  jobType: "Full-Time",
  skills: "",
});

useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const data = await getMyCompanies();
      setCompanies(data.companies);
    } catch (error) {
      console.error(error);
    }
  };

  fetchCompanies();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jobData = {
  ...formData,
  skills: formData.skills
    .split(",")
    .map((skill) => skill.trim()),
};

const data = await createJob(jobData);

      alert(data.message || "Job Posted Successfully");

      setFormData({
        title: "",
        company: "",
        location: "",
        jobType: "Full Time",
        salary: "",
        experience: "",
        description: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Post New Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          value={formData.title}
          onChange={handleChange}
        />

        <select
  name="company"
  value={formData.company}
  onChange={handleChange}
  className="w-full border rounded p-3"
>
  <option value="">Select Company</option>

  {companies.map((company) => (
    <option
      key={company._id}
      value={company._id}
    >
      {company.companyName}
    </option>
  ))}
</select>

        <input
          name="location"
          placeholder="Location"
          className="w-full border p-3 rounded"
          value={formData.location}
          onChange={handleChange}
        />

        <select
          name="jobType"
          className="w-full border p-3 rounded"
          value={formData.jobType}
          onChange={handleChange}
        >
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        <input
          name="salary"
          placeholder="Salary"
          className="w-full border p-3 rounded"
          value={formData.salary}
          onChange={handleChange}
        />

        <input
          name="experience"
          placeholder="Experience"
          className="w-full border p-3 rounded"
          value={formData.experience}
          onChange={handleChange}
        />

        <input
  type="text"
  name="skills"
  placeholder="React, Node.js, MongoDB"
  className="w-full border p-3 rounded"
  value={formData.skills}
  onChange={handleChange}
/>

        <textarea
          name="description"
          rows="5"
          placeholder="Job Description"
          className="w-full border p-3 rounded"
          value={formData.description}
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Post Job
        </button>

      </form>

    </div>
  );
};

export default PostJob;