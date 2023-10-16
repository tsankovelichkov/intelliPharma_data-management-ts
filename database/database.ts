/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import dotenv from "dotenv";
import findConfig from "find-config";
import PharmacyProduct from "./schemas/PharmacyProduct";
import { ProductData, ProductDataForUpdate } from "../interfaces/interfaces";
import { generalVars } from "../variables/variables";
import { stableConnectionFetch } from "../services/general/general-service";
import { log, throwError } from "../utils/general/general-util";

dotenv.config({ path: findConfig(".env") as string });

const initDatabase = async () => {
  try {
    const fetchFunc = async () => {
      const connect = mongoose
        .connect(
          `mongodb+srv://tsankovelichkov:${process.env.DATABASE_PASSWORD}@cluster0.omm2s7n.mongodb.net/intelliPharma`
        )
        .then(() => generalVars.DB_CONNECT);

      return connect;
    };

    const response = await stableConnectionFetch(
      fetchFunc,
      generalVars.STANDARD_TERMINATION_TIME,
      "Failed to init database."
    );
    log(response);
  } catch (error) {
    throwError("Failed to init database.", error);
  }
};

initDatabase();

export const databaseFindByRetailCompany = async (
  companyName: string
): Promise<any[] | undefined> => {
  try {
    const fetchFunc = async () => {
      const allData = await PharmacyProduct.find({
        retailCompany: companyName,
      });
      return allData;
    };

    const response = await stableConnectionFetch(
      fetchFunc,
      generalVars.STANDARD_TERMINATION_TIME,
      "Failed to return retail company data."
    );

    return response;
  } catch (error) {
    throwError("Failed to return retail company data.", error);
  }
};

export const databaseInsert = async (data: ProductData) => {
  if (
    Number.isNaN(data.regularPrice) ||
    Number.isNaN(data.discountPrice) ||
    Number.isNaN(data.clubCardPrice)
  )
    return generalVars.NaN_VALUE;
  try {
    const fetchFunc = async () => {
      const pharmacyProductData = new PharmacyProduct(data);

      const response = await pharmacyProductData.save().then(() => {
        return generalVars.PRODUCT_SAVED;
      });

      return response;
    };

    const response = await stableConnectionFetch(
      fetchFunc,
      generalVars.STANDARD_TERMINATION_TIME,
      "Failed to add product in database."
    );

    return response;
  } catch (error) {
    throwError("Failed to add product in database.", error);
  }
};

export const databaseUpdate = async (
  productId: any,
  dataForUpdate: ProductDataForUpdate
) => {
  if (
    Number.isNaN(dataForUpdate.regularPrice) ||
    Number.isNaN(dataForUpdate.discountPrice) ||
    Number.isNaN(dataForUpdate.clubCardPrice)
  )
    return generalVars.NaN_VALUE;

  try {
    const fetchFunc = async () => {
      const response = await PharmacyProduct.findByIdAndUpdate(
        productId,
        dataForUpdate
      ).then(() => {
        return generalVars.PRODUCT_UPDATED;
      });

      return response;
    };

    const response = await stableConnectionFetch(
      fetchFunc,
      generalVars.STANDARD_TERMINATION_TIME,
      "Failed to update product in database."
    );

    return response;
  } catch (error) {
    throwError("Failed to update product in database.", error);
  }
};
