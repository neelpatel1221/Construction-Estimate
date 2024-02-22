// TotalCostDisplay.js

import React from "react";

const TotalCostDisplay = ({ totalCost }) => {
  return (
    totalCost !== null && (
      <div className="mt-4">
        <p className="text-xl font-semibold">Total Construction Cost:</p>
        <p className="text-2xl text-blue-500">{`₹${totalCost}`}</p>
      </div>
    )
  );
};

export default TotalCostDisplay;
