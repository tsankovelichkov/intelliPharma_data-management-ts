import mongoose from "mongoose";
import { allowedRetailCompanies } from "../../variables/variables";

const pharmacyProductSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  retailCompany: {
    type: String,
    enum: allowedRetailCompanies,
    required: true,
  },
  regularPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  clubCardPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
    required: true,
  },
});

export = mongoose.model(
  "PharmacyProducts",
  pharmacyProductSchema,
  "all-pharmacy-products-test"
);
