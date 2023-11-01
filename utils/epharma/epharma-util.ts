/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractedProductData, Prices } from "../../interfaces/interfaces";

import jsdom from "jsdom";
import { generalVars, pharmacyVars } from "../../variables/variables";
const { JSDOM } = jsdom;

const getProductPrices = (productDataDom: any): Prices => {
  let regularPrice = 0;
  let discountPrice = 0;
  const clubCardPrice = 0;

  if (!productDataDom) {
    return {
      regularPrice,
      discountPrice,
      clubCardPrice,
    };
  }

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
    clubCardPrice,
  };
};

export const extractEpharmaProductInfo = (
  stringHTML: string | undefined
): ExtractedProductData | undefined => {
  if (!stringHTML) return;

  const productDataDom: any = new JSDOM(stringHTML);

  const buyButton = productDataDom.window.document.querySelector(".button-buy");

  const isProductAvailable = buyButton && !buyButton.disabled;

  const isMedicine =
    productDataDom.window.document.querySelector(".is-medicine");

  const priceBox = productDataDom.window.document.querySelector(".new-price");

  if (!isMedicine) return;

  let productId = productDataDom.window.document.querySelector(
    ".article-number-content"
  )?.innerHTML;

  let image = generalVars.MISSING_IMAGE;

  const title = productDataDom.window.document
    .querySelector(".heading")
    ?.innerHTML.trim();

  let manufacturer = generalVars.MISSING_MANUFACTURER;

  const { regularPrice, discountPrice, clubCardPrice } = getProductPrices(
    priceBox ? productDataDom : undefined
  );

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
        ?.lastElementChild.innerHTML;

  return {
    productId: priceBox ? productId : generalVars.MISSING_ID,
    image,
    title,
    manufacturer,
    regularPrice,
    discountPrice,
    clubCardPrice,
    available: isProductAvailable && priceBox ? true : false,
  };
};
