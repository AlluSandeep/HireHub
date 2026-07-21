import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

import JobCard from "../components/JobCard";
import Loader from "../components/Loader";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();

      setJobs(data.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <h1 className="text-4xl font-bold mb-8">
        Latest Jobs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
          />
        ))}

      </div>

    </div>
  );
};

export default Jobs;