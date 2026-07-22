import { useEffect, useState } from "react";
import { getMyApplications } from "../../services/applicationService";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data.applications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return <h2 className="text-xl">Loading...</h2>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p>You haven't applied for any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Job</th>
                <th className="border p-3">Company</th>
                <th className="border p-3">Location</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Applied On</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td className="border p-3">
                    {application.job?.title}
                  </td>

                  <td className="border p-3">
                    {application.job?.company?.companyName}
                  </td>

                  <td className="border p-3">
                    {application.job?.location}
                  </td>

                  <td className="border p-3">
                    {application.status}
                  </td>

                  <td className="border p-3">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;