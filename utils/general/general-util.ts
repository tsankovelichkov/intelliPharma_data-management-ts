/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExistingProductData,
  ProductData,
  ProductDataForUpdate,
} from "../../interfaces/interfaces";

export const getDataForUpdate = (
  existingProductsArr: Array<any>,
  newData: ProductData
): ProductDataForUpdate | undefined => {
  if (existingProductsArr.length > 1) return;

  const existingProductData = existingProductsArr[0] as ExistingProductData;
  const updateData: any = {};

  const keysArr = Object.keys(existingProductData._doc);

  keysArr.forEach((key: string) => {
    if (
      key !== "_id" &&
      key !== "__v" &&
      existingProductData[key as keyof ExistingProductData] !==
        newData[key as keyof ProductData]
    ) {
      updateData[key] = newData[key as keyof ProductData];
    }
  });

  return updateData;
};
