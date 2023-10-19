/* eslint-disable @typescript-eslint/no-explicit-any */
import { databaseFindByRetailCompany } from "../database/database";
import {
  ExtractedProductData,
  Pharmacies,
  ProductData,
} from "../interfaces/interfaces";
import { addProduct, updateProduct } from "../services/general/general-service";
import { getDataForUpdate, log } from "../utils/general/general-util";
import { generalVars, pharmacyVars } from "../variables/variables";

export const basicCollector = async (
  retailCompany: Pharmacies,
  fetchSitemapData: (
    url: string
  ) => Promise<NodeListOf<HTMLElement> | undefined>,
  fetchProductData: (
    productLink: string | undefined,
    targetClass: string
  ) => Promise<string | undefined>,
  extractProductInfo: (
    stringHTML: string | undefined
  ) => ExtractedProductData | undefined
) => {
  const allProducts = await databaseFindByRetailCompany(retailCompany);

  const sitemap = await fetchSitemapData(
    pharmacyVars[retailCompany].SITEMAP_URL
  );

  if (!sitemap || !allProducts) return;

  for (let index = 0; index < sitemap.length; index++) {
    log(index);
    const productLink = sitemap[index].innerHTML;

    const existingProductsArr = allProducts.filter(
      (product) => product.link === productLink
    );

    const isProductAdded = existingProductsArr.length;

    const stringHTML = await fetchProductData(
      productLink,
      pharmacyVars[retailCompany].TARGET_CLASS
    );

    const extractedData = extractProductInfo(stringHTML);

    if (!extractedData) continue;

    const newProductData: ProductData = {
      ...extractedData,
      retailCompany,
      link: productLink as string,
    };

    if (!isProductAdded) {
      const response = await addProduct(newProductData);
      log(response);
    } else {
      const dataForUpdate = getDataForUpdate(
        existingProductsArr,
        newProductData
      );

      const response = await updateProduct(existingProductsArr, dataForUpdate);

      if (response) log(response);
    }
  }

  log(generalVars.COLLECT_DATA_END);
  return;
};
