const WhyChooseUs = () => {
  return (
    <section className="bg-blue-100 py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold">
          <span className="bg-gray-200 px-3 py-1 rounded">
            Why Choosing Medlink
          </span>
        </h2>
        <h3 className="text-xl font-semibold mt-4">
          The Wide Network of Best{" "}
          <span className="text-black">Healthcare</span>
        </h3>
        <p className="text-sm text-gray-700 mt-2 mb-6">
          The Decedent Affairs Office also works with the funeral home or
          transport services and helps to complete and file necessary paperwork
          with county and state offices.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-blue-700">
          <div>✔️ Professional Medical Services</div>
          <div>✔️ Quality & Patient Safety</div>
          <div>✔️ Well experienced Doctors</div>
          <div>✔️ Best Article Recommendation</div>
          <div>✔️ Free Consulting</div>
          <div>✔️ First Aid Guidance</div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
