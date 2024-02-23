import ExcelJS from "exceljs";

const generateExcelFile = (calculationData, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Calculation Results");

  // Add header and value pairs in separate columns
  worksheet.addRow(["Carpet Area", calculationData.carpetArea]);
  worksheet.addRow(["Cost per Carpet Area", calculationData.costPerCarpetArea]);
  worksheet.addRow(["Total Cost", calculationData.totalCost]);

  // Set column widths for header and value pairs
  worksheet.getColumn(1).width = 20;
  worksheet.getColumn(2).width = 15;

  // Add an empty row
  worksheet.addRow([]);

  // Add calculated materials headers
  worksheet.addRow(["Material", "Quantity", "Measure", "Price"]);

  // Add calculated materials data
  calculationData.calculatedMaterials.forEach((material) => {
    const row = worksheet.addRow([
      material.title,
      material.quantity,
      material.measure,
      material.price,
    ]);

    // Apply Indian currency formatting to the "Price" and "Total Cost" columns
    const priceCell = row.getCell(3);
    const totalCostCell = row.getCell(4);

    priceCell.numFmt = '"₹" #,##0.00'; // Indian Rupees format
    totalCostCell.numFmt = '"₹" #,##0.00'; // Indian Rupees format
  });

  // Set headers for the response
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=calculation_results.xlsx"
  );

  // Stream the Excel file directly to the response
  return workbook.xlsx.write(res).then(() => {
    // Ensure the stream is closed after writing is complete
    res.end();
  });
};

export default generateExcelFile;
