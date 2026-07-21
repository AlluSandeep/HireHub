import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Hyderabad",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Microsoft",
    location: "Bangalore",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Chennai",
  },
];

const FeaturedJobs = () => {
  return (
    <section className="py-16 bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-10 text-center">
          Featured Jobs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-800 rounded-xl p-6 hover:scale-105 transition"
            >
              <h3 className="text-2xl font-bold">
                {job.title}
              </h3>

              <p>{job.company}</p>

              <p>{job.location}</p>

              <Link
                to="/jobs"
                className="inline-block mt-5 bg-blue-600 px-5 py-2 rounded"
              >
                View Jobs
              </Link>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedJobs;