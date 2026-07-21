import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Find Your Dream Job
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
          Discover thousands of jobs from top companies and start your career today.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            to="/jobs"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            Browse Jobs
          </Link>

          <Link
            to="/register"
            className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;