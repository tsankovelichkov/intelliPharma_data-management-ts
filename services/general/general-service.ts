/* eslint-disable @typescript-eslint/no-explicit-any */
import { databaseInsert, databaseUpdate } from "../../database/database";
import {
  ExistingProductData,
  ProductData,
  ProductDataForUpdate,
} from "../../interfaces/interfaces";

export const fetchProductData = async (
  fetchExpression: Promise<string | undefined>,
  terminationTime: number
) => {
  const enterenceTime = new Date().getTime();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const response = await fetchExpression;

      return response;
    } catch (error) {
      const timeAtTheMoment = new Date().getTime();

      if (timeAtTheMoment - enterenceTime > terminationTime)
        throw new Error("Unresolvable LAN issue.");

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

export const addProduct = async (data: ProductData) => {
  const response = await databaseInsert(data);
  return response;
};

export const updateProduct = async (
  existingProductsArr: Array<any>,
  dataForUpdate: ProductDataForUpdate | undefined
) => {
  if (!dataForUpdate) return;

  if (existingProductsArr.length > 1) return;

  const existingProduct = existingProductsArr[0] as ExistingProductData;

  const productId = existingProduct._id;

  const dataForUpdateExists = Object.keys(dataForUpdate).length;

  if (!dataForUpdateExists) return;

  const response = await databaseUpdate(productId, dataForUpdate);

  return response;
};
