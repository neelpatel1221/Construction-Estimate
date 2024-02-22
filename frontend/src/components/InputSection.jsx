// InputSection.js

import React from "react";

const InputSection = ({
  carpetArea,
  costPerCarpetArea,
  handleCarpetAreaChange,
  handleCostPerCarpetAreaChange,
  handleFormSubmit,
  handleInputChange,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carpet Area Input */}
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="carpetArea"
          >
            Carpet Area (in square meters):
          </label>
          <input
            type="text"
            id="carpetArea"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter carpet area"
            name="carpetArea"
            // value={carpetArea}
            onChange={handleInputChange}
          />
        </div>

        {/* Cost Per Carpet Area Input */}
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="costPerCarpetArea"
          >
            Cost Per Carpet Area (in rupees):
          </label>
          <input
            type="text"
            id="costPerCarpetArea"
            name="costPerCarpetArea"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter cost per carpet area"
            // value={costPerCarpetArea}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Calculate
      </button>
    </form>
  );
};

export default InputSection;
