const Stats = () => {
  const stats = [
    {
      title: "10,000+",
      subtitle: "Jobs Posted",
    },
    {
      title: "5,000+",
      subtitle: "Companies",
    },
    {
      title: "25,000+",
      subtitle: "Candidates",
    },
    {
      title: "95%",
      subtitle: "Success Rate",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 px-6">

        {stats.map((item) => (
          <div
            key={item.subtitle}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-blue-600">
              {item.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {item.subtitle}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Stats;