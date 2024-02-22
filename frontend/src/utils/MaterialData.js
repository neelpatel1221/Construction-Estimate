// materialData.js

const calculateMaterialData = (carpetArea, totalCost) => {
  return [
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
      priceFormula: () => (totalCost * 7.8) / 100,
      measure: "Ton",
    },
    {
      title: "Steel Required",
      quantityFormula: () => carpetArea * 4,
      priceFormula: () => (totalCost * 24.8) / 100,
      measure: "Kg.",
    },
    {
      title: "Paint Required",
      quantityFormula: () => carpetArea * 0.18,
      priceFormula: () => (totalCost * 12.8) / 100,
      measure: "lt.",
    },
    {
      title: "Brick Required",
      quantityFormula: () => carpetArea * 8,
      priceFormula: () => (totalCost * 7.8) / 100,
      measure: "Pcs.",
    },
    {
      title: "Flooring",
      // quantityFormula: () => carpetArea * 1.3,
      priceFormula: () => (totalCost * 22.8) / 100,
      // measure: "Pcs.",
    },
    {
      title: "Finishers",
      // quantityFormula: () => carpetArea * 10,
      priceFormula: () => (totalCost * 16.5) / 100,
      // measure: "Pcs.",
    },
    {
      title: "Fittings",
      // quantityFormula: () => carpetArea * 10,
      priceFormula: () => (totalCost * 22.8) / 100,
      // measure: "Pcs.",
    },
  ];
};

export default calculateMaterialData;
