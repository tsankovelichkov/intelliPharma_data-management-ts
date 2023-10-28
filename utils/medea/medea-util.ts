/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExistingProductData,
  ExtractedProductData,
  Prices,
} from "../../interfaces/interfaces";
import { generalVars } from "../../variables/variables";

import jsdom from "jsdom";
const { JSDOM } = jsdom;

const getProductPrices = (productDataDom: any): Prices => {
  let regularPrice;
  let discountPrice;

  if (productDataDom.window.document.querySelector(".special-price")) {
    discountPrice = Number(
      productDataDom.window.document
        .querySelector(".special-price")
        .lastElementChild.innerHTML.replace("&nbsp;лв.", "")
        .replace(",", ".")
    );
    regularPrice = Number(
      productDataDom.window.document
        .querySelector(".old-price")
        .lastElementChild.innerHTML.replace("&nbsp;лв.", "")
        .replace(",", ".")
    );
  } else {
    regularPrice = Number(
      productDataDom.window.document
        .querySelector(".regular-price")
        .firstElementChild.innerHTML.replace("&nbsp;лв.", "")
        .replace(",", ".")
    );
    discountPrice = 0;
  }

  return {
    regularPrice,
    discountPrice,
    clubCardPrice: 0,
  };
};

const getProductManufacturer = (productDataDom: any): string => {
  let manufacturer = generalVars.MISSING_MANUFACTURER;

  if (productDataDom.window.document.querySelector(".shortDesc")) {
    manufacturer = productDataDom.window.document
      .querySelector(".shortDesc")
      .firstElementChild.innerHTML.trim()
      .split(" | ")[1];
    if (!manufacturer)
      manufacturer =
        productDataDom.window.document.querySelector(".shortDesc")
          .firstElementChild.innerHTML;

    return manufacturer;
  }

  if (productDataDom.window.document.querySelector(".productBrand")) {
    manufacturer = productDataDom.window.document
      .querySelector(".productBrand")
      .firstElementChild.getAttribute("alt")
      .trim()
      .split(" | ")[1];
    if (!manufacturer)
      manufacturer = productDataDom.window.document
        .querySelector(".productBrand")
        .firstElementChild.getAttribute("alt");

    return manufacturer;
  }

  return manufacturer;
};

export const extractMedeaProductInfo = (
  stringHTML: string | undefined,
  existingProductsArr: Array<ExistingProductData>
): ExtractedProductData | undefined => {
  if (!stringHTML) return;

  const productDataDom: any = new JSDOM(stringHTML);

  const isProductAdded = existingProductsArr.length === 1;

  if (!productDataDom.window.document.querySelector(".price-box")) {
    if (!isProductAdded) return;

    const existingProductData = existingProductsArr[0];
    return {
      ...existingProductData,
      available: false,
    };
  }

  const productId = productDataDom.window.document
    .querySelector(".sku")
    .innerHTML.split("/")[0]
    .replace("\n\t\t\tПрод.код ", "")
    .trim();

  let image = generalVars.MISSING_IMAGE;

  const title = productDataDom.window.document
    .querySelector(".category-title")
    .innerHTML.trim();

  const manufacturer = getProductManufacturer(productDataDom);

  const { regularPrice, discountPrice, clubCardPrice } =
    getProductPrices(productDataDom);

  if (productDataDom.window.document.querySelector(".sp-image"))
    image = productDataDom.window.document
      .querySelector(".sp-image")
      .getAttribute("src");

  return {
    productId,
    image,
    title,
    manufacturer,
    regularPrice,
    discountPrice,
    clubCardPrice,
    available: true,
  };
};
