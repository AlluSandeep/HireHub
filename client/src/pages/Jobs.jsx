import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
const [location, setLocation] = useState("");

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

  const filteredJobs = jobs.filter((job) => {
  const title = job.title?.toLowerCase() || "";
  const company = job.company?.companyName?.toLowerCase() || "";
  const jobLocation = String(job.location || "").toLowerCase();

  return (
    (title.includes(search.toLowerCase()) ||
      company.includes(search.toLowerCase())) &&
    jobLocation.includes(location.toLowerCase())
  );
});

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <h1 className="text-4xl font-bold mb-8">
        Latest Jobs
      </h1>

      <SearchBar
  search={search}
  setSearch={setSearch}
  location={location}
  setLocation={setLocation}
/>

      {filteredJobs.length === 0 ? (
  <div className="text-center py-10">
    <h2 className="text-2xl font-semibold">
      No Jobs Found
    </h2>
  </div>
) : (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredJobs.map((job) => (
      <JobCard
        key={job._id}
        job={job}
      />
    ))}
  </div>
)}

    </div>
  );
};

export default Jobs;