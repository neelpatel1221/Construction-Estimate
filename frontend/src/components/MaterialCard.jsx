// MaterialCard.js

import React from "react";

const MaterialCard = ({ title, quantity, price, measure }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="mb-2">
        Quantity:{" "}
        <span className="font-semibold">
          {quantity} {measure}
        </span>
      </p>
      <p>
        Price: <span className="font-semibold">{`₹${price}`}</span>
      </p>
    </div>
  );
};

export default MaterialCard;
