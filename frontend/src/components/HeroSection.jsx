// HeroSection.js
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
