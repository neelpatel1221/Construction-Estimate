import calculateMaterialData from "../../../frontend/src/utils/MaterialData.js";
import { Calculation } from "../models/calculation.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
const performCalculation = asyncHandler(async (req, res) => {
  const { carpetArea, costPerCarpetArea } = req.body;
  const materialData = [
    {
      title: "Sand Required",
      quantityFormula: () => carpetArea * 0.816,
      priceFormula: () => (12.3 / 100) * totalCost,
      measure: "Ton",
    },
    {
      title: "Cement Required",
      quantityFormula: () => carpetArea * 0.4,
      priceFormula: () => (totalCost * 16.4) / 100,
      measure: "Bags",
    },
    {
      title: "Aggregate Required",
      quantityFormula: () => carpetArea * 0.608,
      priceFormula: () => (totalCost * 7.4) / 100,
      measure: "Ton",
    },
    {
      title: "Steel Required",
      quantityFormula: () => carpetArea * 4,
      priceFormula: () => (totalCost * 24.6) / 100,
      measure: "Kg.",
    },
    {
      title: "Paint Required",
      quantityFormula: () => carpetArea * 0.18,
      priceFormula: () => (totalCost * 4.1) / 100,
      measure: "lt.",
    },
    {
      title: "Brick Required",
      quantityFormula: () => carpetArea * 8,
      priceFormula: () => (totalCost * 4.4) / 100,
      measure: "Pcs.",
    },
    {
      title: "Flooring",
      quantityFormula: () => carpetArea * 1.3,
      // priceFormula: () => (totalCost * 22.8) / 100,
      measure: "Sq.ft.",
    },
    {
      title: "Finishers",
      priceFormula: () => {
        const paintPrice = parseFloat(
          materialData
            .find((material) => material.title === "Paint Required")
            ?.priceFormula?.()
        ).toFixed(2);

        const brickPrice = parseFloat(
          materialData
            .find((material) => material.title === "Brick Required")
            ?.priceFormula?.()
        ).toFixed(2);

        // Calculate the sum of paintPrice and brickPrice
        return (parseFloat(paintPrice) + parseFloat(brickPrice)).toFixed(2);
      },
      measure: "Pcs.",
    },
    {
      title: "Fittings",
      // quantityFormula: () => carpetArea * 10,
      priceFormula: () => (totalCost * 22.8) / 100,
      // measure: "Pcs.",
    },
  ];

  let totalCost = carpetArea * costPerCarpetArea;

  const calculatedMaterials = materialData.map((material) => {
    // Check if quantityFormula is a function
    const quantity =
      typeof material.quantityFormula === "function"
        ? material.quantityFormula()
        : 0;

    // Check if priceFormula is a function before executing it
    const price =
      typeof material.priceFormula === "function"
        ? parseFloat(material.priceFormula()).toFixed(2)
        : 0; // or whatever default value you prefer

    return {
      title: material.title,
      quantity: isNaN(quantity) ? 0 : quantity,
      price: isNaN(price) ? 0 : price,
      measure: material.measure,
    };
  });

  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  await Calculation.create({
    userId: user._id,
    carpetArea,
    costPerCarpetArea,
    totalCost,
    calculatedMaterials,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { carpetArea, costPerCarpetArea, totalCost, calculatedMaterials },
        "Received"
      )
    );
});

export { performCalculation };
