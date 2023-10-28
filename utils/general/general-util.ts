/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExistingProductData,
  ProductData,
  ProductDataForUpdate,
} from "../../interfaces/interfaces";

export const getDataForUpdate = (
  existingProductsArr: Array<ExistingProductData>,
  newData: ProductData
): ProductDataForUpdate | undefined => {
  if (existingProductsArr.length > 1) return;

  const existingProductData = existingProductsArr[0];
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

export const log = (text: string | number | undefined): void => {
  // eslint-disable-next-line no-console
  console.log(text);
};

export const throwError = (text: string, errorMsg?: any) => {
  // eslint-disable-next-line no-console
  if (text && !errorMsg) throw console.error(text);

  // eslint-disable-next-line no-console
  throw console.error(text, errorMsg);
};
