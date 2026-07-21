const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Infosys",
  "TCS",
  "Wipro",
];

const TopCompanies = () => {
  return (
    <section className="py-16">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Top Companies
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {companies.map((company) => (
            <div
              key={company}
              className="border rounded-xl p-8 text-center shadow hover:shadow-lg"
            >
              <h3 className="text-2xl font-semibold">
                {company}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default TopCompanies;