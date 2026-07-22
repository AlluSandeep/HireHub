import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCompanies, deleteCompany } from "../../services/companyService";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const data = await getMyCompanies();
      setCompanies(data.companies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this company?")) return;

    try {
      await deleteCompany(id);
      fetchCompanies();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Companies</h1>

        <Link
          to="/recruiter/company/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Company
        </Link>
      </div>

      <table className="w-full border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Company</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Location</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td className="border p-3">{company.companyName}</td>
              <td className="border p-3">{company.companyEmail}</td>
              <td className="border p-3">{company.companyLocation}</td>

              <td className="border p-3 space-x-2">
                <Link
                  to={`/recruiter/company/edit/${company._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(company._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {companies.length === 0 && (
        <p className="text-center mt-8 text-gray-500">
          No companies found.
        </p>
      )}
    </div>
  );
};

export default CompanyList;