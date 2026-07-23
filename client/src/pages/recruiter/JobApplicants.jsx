import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicantsByJob,
  updateApplicationStatus,
  getCandidateResume,
} from "../../services/applicationService";

const JobApplicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  const fetchApplicants = async () => {
    try {
      const data = await getApplicantsByJob(jobId);
      setApplications(data.applications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      fetchApplicants();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleResume = async (candidateId) => {
    try {
      const data = await getCandidateResume(candidateId);

      if (data?.candidate?.resume) {
        window.open(data.candidate.resume, "_blank");
      } else {
        alert("Resume not found");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Unable to open resume");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-300 overflow-hidden">

        <div className="bg-blue-600 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">Applicants</h1>
        </div>

        {applications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No Applicants Found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead className="bg-gray-100 dark:bg-slate-800">
                <tr>
                  <th className="border border-gray-300 px-4 py-3">
                    Name
                  </th>

                  <th className="border border-gray-300 px-4 py-3">
                    Email
                  </th>

                  <th className="border border-gray-300 px-4 py-3">
                    Status
                  </th>

                  <th className="border border-gray-300 px-4 py-3">
                    Resume
                  </th>

                  <th className="border border-gray-300 px-4 py-3">
                    Update
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application._id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {application.candidate?.fullName}
                    </td>

                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {application.candidate?.email}
                    </td>

                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {application.status}
                    </td>

                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          handleResume(application.candidate._id)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        View Resume
                      </button>
                    </td>

                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <select
                        value={application.status}
                        onChange={(e) =>
                          handleStatus(
                            application._id,
                            e.target.value
                          )
                        }
                        className="border rounded-md px-3 py-2"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;