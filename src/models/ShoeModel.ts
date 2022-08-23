import { Schema } from "mongoose";
import mongoose from "mongoose";

const ShoeModel = new Schema(
  {
    model: String,
    brand: String,
    urlImage: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shoe", ShoeModel);
