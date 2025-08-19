const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 700,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    specifications: {
      screen: { type: String },
      backCamera: { type: String },
      selfieCamera: { type: String },
      internalMemory: { type: String },
      CPU: { type: String },
      batteryCapacity: { type: String },
      SIM: { type: String },
      operatingSystem: { type: String },
      RAM: { type: String },
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    quantity: { type: Number },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
