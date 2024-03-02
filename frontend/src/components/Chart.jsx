import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function Chart({ materialData, materialPrices }) {
  const chartData = materialPrices.map((price, index) => {
    // Extracting only the desired part of the title
    const extractedTitle = materialData[index].title.replace(" Required", "");

    return {
      id: index,
      value: price, // Assuming each price is a number
      label: extractedTitle, // Using the modified title as the label
    };
  });
  return (
    <div className=" m-5 p-5 w-full flex justify-center">
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={600}
        height={300}
      />
    </div>
  );
}

export default Chart;
