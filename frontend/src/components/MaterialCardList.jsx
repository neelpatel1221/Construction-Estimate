// MaterialCardList.js

import React from "react";
import MaterialCard from "./MaterialCard.jsx";

const MaterialCardList = ({
  materialData,
  materialQuantities,
  materialPrices,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {materialData.map((material, index) => (
        <MaterialCard
          key={index}
          title={material.title}
          quantity={materialQuantities[index] || "0.00"}
          price={materialPrices[index] || "0.00"}
          measure={material.measure}
        />
      ))}
    </div>
  );
};

export default MaterialCardList;
