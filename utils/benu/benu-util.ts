import { ExtractedProductData, Prices } from "../../interfaces/interfaces";

import jsdom from "jsdom";
import { generalVars } from "../../variables/variables";
const { JSDOM } = jsdom;

/* eslint-disable @typescript-eslint/no-explicit-any */
const getProductPrices = (productDataDom: any): Prices => {
  let regularPrice = 0;
  let discountPrice = 0;

  if (
    productDataDom.window.document.querySelector(".buy-box__price-head")
      .lastElementChild.tagName == "DEL"
  ) {
    regularPrice = Number(
      productDataDom.window.document
        .querySelector("del")
        .innerHTML.replace("&nbsp;лв.", "")
        .replace(",", ".")
    );
    discountPrice = Number(
      productDataDom.window.document
        .querySelector(".buy-box__big-price")
        .innerHTML.replace("&nbsp;лв.", "")
        .replace(",", ".")
    );
  } else {
    regularPrice = Number(
      productDataDom.window.document
        .querySelector(".buy-box__big-price")
        .innerHTML.replace("&nbsp;лв.", "")
        .replace(",", ".")
    );
  }

  return {
    regularPrice,
    discountPrice,
    clubCardPrice: 0,
  };
};

export const extractBenuProductInfo = (
  stringHTML: string | undefined
): ExtractedProductData | undefined => {
  if (!stringHTML) return;

  if (stringHTML.includes("Accu-Chek Instant Тест-ленти за кръвна захар х50"))
    return;

  const productDataDom: any = new JSDOM(stringHTML);

  if (!productDataDom) return;

  if (!productDataDom.window.document.querySelector(".buy-box__price-head"))
    return;

  const productId = generalVars.MISSING_ID;

  let image = generalVars.MISSING_IMAGE;

  const title =
    productDataDom.window.document.querySelector(".itemreviewed").innerHTML;

  const manufacturer = productDataDom.window.document
    .querySelector(".info-table")
    .firstElementChild.querySelector("a")
    .innerHTML.replace("*", "")
    .trim();

  const { regularPrice, discountPrice, clubCardPrice } =
    getProductPrices(productDataDom);

  if (
    productDataDom.window.document
      .querySelector(".js-pdbox")
      .getAttribute("href") &&
    productDataDom.window.document
      .querySelector(".js-pdbox")
      .getAttribute("href")
      .includes(".jpg")
  ) {
    image = productDataDom.window.document
      .querySelector(".js-pdbox")
      .getAttribute("href");
  }

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
