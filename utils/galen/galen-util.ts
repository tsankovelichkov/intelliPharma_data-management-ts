/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractedProductData, Prices } from "../../interfaces/interfaces";

import jsdom from "jsdom";
const { JSDOM } = jsdom;

const getProductPrices = (productDataDom: any): Prices => {
  let regularPrice = 0;
  let discountPrice = 0;

  if (productDataDom.window.document.querySelector("meta[itemprop='price']")) {
    if (productDataDom.window.document.querySelector(".old-price")) {
      const priceStr = productDataDom.window.document
        .querySelector(".price-wrapper")
        .firstElementChild.firstElementChild.innerHTML.split(
          `<span class="precision text-s align-top">`
        );
      regularPrice = Number(priceStr[0] + priceStr[1].slice(0, 3));

      discountPrice = Number(
        productDataDom.window.document
          .querySelector("meta[itemprop='price']")
          .getAttribute("content")
      );
    } else {
      regularPrice = Number(
        productDataDom.window.document
          .querySelector("meta[itemprop='price']")
          .getAttribute("content")
      );
    }
  }

  return {
    regularPrice,
    discountPrice,
    clubCardPrice: 0,
  };
};

export const extractGalenProductInfo = (
  stringHTML: string | undefined
): ExtractedProductData | undefined => {
  const productDataDom: any = new JSDOM(stringHTML);

  if (!productDataDom) return;

  if (!productDataDom.window.document.querySelector(".product-price-block"))
    return;

  const priceDOM = new JSDOM(
    productDataDom.window.document
      .querySelector(".product-price-block")
      .innerHTML.split(`<div class="price-container">`)[1]
  );

  if (!priceDOM.window.document.querySelector("meta[itemprop='price']")) return;

  const productId = productDataDom.window.document
    .querySelector(".text-primary-lighter")
    .innerHTML.replace(`<span class="font-semibold">Арт. №</span>`, "")
    .trim();

  const image = productDataDom.window.document
    .getElementsByTagName("img")[0]
    .getAttribute("src");

  const title = productDataDom.window.document
    .querySelector("h1")
    .innerHTML.trim();

  const manufacturer = productDataDom.window.document
    .querySelector(".product-attribute-value")
    .innerHTML.trim();

  const { regularPrice, discountPrice, clubCardPrice } =
    getProductPrices(priceDOM);

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
