// Estimator.js

import React, { useState } from "react";
import MaterialCardList from "./MaterialCardList.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputSection from "./InputSection.jsx";
import TotalCostDisplay from "./TotalCostDisplay.jsx";
import calculateMaterialData from "../utils/MaterialData.js";
import axios from "axios";

const Estimator = () => {
  const [carpetArea, setCarpetArea] = useState("");
  const [costPerCarpetArea, setCostPerCarpetArea] = useState("");
  const [totalCost, setTotalCost] = useState(null);
  const [materialQuantities, setMaterialQuantities] = useState([]);
  const [materialPrices, setMaterialPrices] = useState([]);
  const [formData, setFormData] = useState({
    carpetArea: 0,
    costPerCarpetArea: 0,
  });

  const materialData = calculateMaterialData(carpetArea, totalCost);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post("/api/v1/users/calculate", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = response.data.data;
      setTotalCost(responseData.totalCost);
      setMaterialQuantities(
        responseData.calculatedMaterials.map((material) =>
          material.quantity.toFixed(2)
        )
      );
      setMaterialPrices(
        responseData.calculatedMaterials.map((material) => material.price)
      );
    } catch (error) {
      toast.error(error.message);
      console.error("API request failed", error);
    }
  };

  return (
    <div className="container mx-auto m-8 p-8">
      <h2 className="text-3xl font-semibold mb-4">
        Construction Cost Estimator
      </h2>

      {/* {Input Seciton} */}
      <InputSection
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
      />

      {/* Display Total Cost */}
      <TotalCostDisplay totalCost={totalCost} />

      {/* Material Cards Section */}
      <MaterialCardList
        materialData={materialData}
        materialQuantities={materialQuantities}
        materialPrices={materialPrices}
      />
      <ToastContainer />
    </div>
  );
};

export default Estimator;
