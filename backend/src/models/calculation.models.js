import mongoose from "mongoose";
const calculationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carpetArea: {
      type: Number,
      required: true,
    },
    costPerCarpetArea: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    calculatedMaterials: [
      {
        title: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
          required: true,
        },
        measure: {
          type: String,
          // required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Calculation = mongoose.model("Calculation", calculationSchema);
