import React from "react";

function FeatureSection() {
  return (
    <section className="container p-5 mx-auto mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-8 rounded-md shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Intuitive Interface</h3>
          <p className="text-gray-700">
            Our user-friendly interface ensures a seamless experience, making
            construction cost estimation accessible to all users.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-8 rounded-md shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Precision Algorithms</h3>
          <p className="text-gray-700">
            Leverage our state-of-the-art algorithms to generate precise cost
            estimates tailored to your project specifications.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-8 rounded-md shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Effortless Comparison</h3>
          <p className="text-gray-700">
            Save and compare different scenarios effortlessly, empowering you to
            make well-informed budgetary decisions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
