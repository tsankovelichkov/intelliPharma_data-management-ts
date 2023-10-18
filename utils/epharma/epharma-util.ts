/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractedProductData, Prices } from "../../interfaces/interfaces";

import jsdom from "jsdom";
import { generalVars, pharmacyVars } from "../../variables/variables";
const { JSDOM } = jsdom;

const getProductPrices = (productDataDom: any): Prices => {
  let regularPrice;
  let discountPrice;

  if (productDataDom.window.document.querySelector(".old-price")) {
    regularPrice = Number(
      productDataDom.window.document
        .querySelector(".old-price")
        .innerHTML.replace(" лв.", "")
        .replace(",", ".")
    );
    discountPrice = Number(
      productDataDom.window.document
        .querySelector(".new-price")
        .innerHTML.replace(" лв.", "")
        .replace(",", ".")
    );
  } else {
    regularPrice = Number(
      productDataDom.window.document
        .querySelector(".new-price")
        .innerHTML.replace(" лв.", "")
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

export const extractEpharmaProductInfo = (
  stringHTML: string | undefined
): ExtractedProductData | undefined => {
  if (!stringHTML) return;

  const productDataDom: any = new JSDOM(stringHTML);

  const isMedicine =
    productDataDom.window.document.querySelector(".is-medicine");
  const newPrice = productDataDom.window.document.querySelector(".new-price");

  if (!isMedicine || !newPrice) return;

  let productId = productDataDom.window.document.querySelector(
    ".article-number-content"
  ).innerHTML;

  let image = generalVars.MISSING_IMAGE;

  const title = productDataDom.window.document
    .querySelector(".heading")
    .innerHTML.trim();

  let manufacturer = generalVars.MISSING_MANUFACTURER;

  const { regularPrice, discountPrice, clubCardPrice } =
    getProductPrices(productDataDom);

  if (!Number(productId)) productId = generalVars.MISSING_ID;

  if (productDataDom.window.document.getElementsByTagName("img")[0])
    image = productDataDom.window.document
      .getElementsByTagName("img")[0]
      .getAttribute("src")
      .replace(".", pharmacyVars.EPHARMA.ROOT_URL);

  if (
    productDataDom.window.document.querySelector(".choose-name")
      .lastElementChild
  )
    manufacturer =
      productDataDom.window.document.querySelector(".choose-name")
        .lastElementChild.innerHTML;

  return {
    productId,
    image,
    title,
    manufacturer,
    regularPrice,
    discountPrice,
    clubCardPrice,
  };
};
