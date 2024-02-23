import React from "react";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className=" bg-gray-100 min-h-screen">
      <HeroSection />
      <FeatureSection />
      <Testimonials />
    </div>
  );
};

export default Home;
