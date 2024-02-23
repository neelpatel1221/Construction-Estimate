// Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ConstructEstimate Pro. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
