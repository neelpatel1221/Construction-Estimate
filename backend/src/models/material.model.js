import mongoose from "mongoose";
const materialSchema = new mongoose.Schema(
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
    measureIn: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Material = mongoose.model("Material", materialSchema);
