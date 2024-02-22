// CalculateButton.js

import React from "react";

const CalculateButton = ({ handleCalculate }) => {
  return (
    <button
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      onClick={handleCalculate}
    >
      Calculate
    </button>
  );
};

export default CalculateButton;
