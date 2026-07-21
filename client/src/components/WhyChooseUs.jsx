const WhyChooseUs = () => {
  const features = [
    "Verified Companies",
    "Easy Job Apply",
    "Fast Hiring Process",
    "Thousands of Jobs",
  ];

  return (
    <section className="bg-blue-600 text-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Why Choose HireHub?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {features.map((feature) => (
            <div
              key={feature}
              className="bg-white text-black rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold">
                ✅ {feature}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;