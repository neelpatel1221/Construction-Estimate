// Home.js

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-E3E1D9 text-gray-800 p-16">
        <div className="container mx-auto">
          <h2 className="text-5xl font-extrabold mb-4">
            Empowering Your Construction Project Management
          </h2>
          <p className="text-lg mb-8">
            ConstructEstimate Pro is the professional's choice for accurate and
            reliable construction cost estimation. Streamline your project
            planning with our advanced tools and industry expertise.
          </p>
          <Link
            to="/estimator"
            className="bg-gray-800 text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-700"
          >
            Start Estimating
          </Link>
        </div>
      </section>

      {/* Features Section */}
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
            <h3 className="text-2xl font-semibold mb-4">
              Precision Algorithms
            </h3>
            <p className="text-gray-700">
              Leverage our state-of-the-art algorithms to generate precise cost
              estimates tailored to your project specifications.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Effortless Comparison
            </h3>
            <p className="text-gray-700">
              Save and compare different scenarios effortlessly, empowering you
              to make well-informed budgetary decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
