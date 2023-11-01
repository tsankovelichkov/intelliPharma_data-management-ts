/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractedProductData, Prices } from "../../interfaces/interfaces";
import { generalVars } from "../../variables/variables";

import jsdom from "jsdom";
const { JSDOM } = jsdom;

const getProductPrices = (productDataDom: any): Prices => {
  let regularPrice = 0;
  let discountPrice = 0;
  const clubCardPrice = 0;

  if (!productDataDom)
    return {
      regularPrice,
      discountPrice,
      clubCardPrice,
    };

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
  }

  return {
    regularPrice,
    discountPrice,
    clubCardPrice,
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
  stringHTML: string | undefined
): ExtractedProductData | undefined => {
  if (!stringHTML) return;

  const productDataDom: any = new JSDOM(stringHTML);

  const priceBox = productDataDom.window.document.querySelector(".price-box");

  const productId = productDataDom.window.document
    .querySelector(".sku")
    ?.innerHTML.split("/")[0]
    .replace("\n\t\t\tПрод.код ", "")
    .trim();

  const title = productDataDom.window.document
    .querySelector(".category-title")
    ?.innerHTML.trim();

  let image = generalVars.MISSING_IMAGE;

  const manufacturer = getProductManufacturer(productDataDom);

  const { regularPrice, discountPrice, clubCardPrice } = getProductPrices(
    priceBox ? productDataDom : undefined
  );

  if (productDataDom.window.document.querySelector(".sp-image"))
    image = productDataDom.window.document
      .querySelector(".sp-image")
      .getAttribute("src");

  return {
    productId: priceBox ? productId : generalVars.MISSING_ID,
    image,
    title,
    manufacturer,
    regularPrice,
    discountPrice,
    clubCardPrice,
    available: priceBox ? true : false,
  };
};
