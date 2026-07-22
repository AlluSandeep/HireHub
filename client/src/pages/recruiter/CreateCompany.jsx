import { useState } from "react";
import { createCompany } from "../../services/companyService";

const CreateCompany = () => {
  const [formData, setFormData] = useState({
  companyName: "",
  companyEmail: "",
  companyWebsite: "",
  companyLocation: "",
  companyDescription: "",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createCompany(formData);

      alert(data.message || "Company Created Successfully");

      setFormData({
  companyName: "",
  companyEmail: "",
  companyWebsite: "",
  companyLocation: "",
  companyDescription: "",
});
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create company");
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create Company</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
  name="companyName"
  placeholder="Company Name"
  className="w-full border p-3 rounded"
  value={formData.companyName}
  onChange={handleChange}
/>

<input
  name="companyEmail"
  type="email"
  placeholder="Company Email"
  className="w-full border p-3 rounded"
  value={formData.companyEmail}
  onChange={handleChange}
/>

        <textarea
  name="companyDescription"
  placeholder="Company Description"
  className="w-full border p-3 rounded"
  value={formData.companyDescription}
  onChange={handleChange}
/>

        <input
  name="companyWebsite"
  placeholder="Website"
  className="w-full border p-3 rounded"
  value={formData.companyWebsite}
  onChange={handleChange}
/>

        <input
          name="companyLocation"
          placeholder="Location"
          className="w-full border p-3 rounded"
          value={formData.location}
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Create Company
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;