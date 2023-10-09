/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import dotenv from "dotenv";
import findConfig from "find-config";
import PharmacyProduct from "./schemas/PharmacyProduct";
import { ProductData, ProductDataForUpdate } from "../interfaces/interfaces";
import { generalVars } from "../variables/variables";

dotenv.config({ path: findConfig(".env") as string });

mongoose
  .connect(
    `mongodb+srv://tsankovelichkov:${process.env.DATABASE_PASSWORD}@cluster0.omm2s7n.mongodb.net/intelliPharma`
  )
  .then(() => console.log(generalVars.DB_CONNECT));

export const databaseFindByRetailCompany = async (
  companyName: string
): Promise<any[]> => {
  const allData = await PharmacyProduct.find({ retailCompany: companyName });
  return allData;
};

export const databaseInsert = async (data: ProductData) => {
  const pharmacyProductData = new PharmacyProduct(data);

  const response = await pharmacyProductData
    .save()
    .then(() => {
      return generalVars.PRODUCT_SAVED;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};

export const databaseUpdate = async (
  productId: any,
  dataForUpdate: ProductDataForUpdate
) => {
  const response = await PharmacyProduct.findByIdAndUpdate(
    productId,
    dataForUpdate
  )
    .then(() => {
      return generalVars.PRODUCT_UPDATED;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};
