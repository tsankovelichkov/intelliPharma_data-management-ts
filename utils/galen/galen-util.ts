/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractedProductData, Prices } from "../../interfaces/interfaces";

import jsdom from "jsdom";
import { generalVars } from "../../variables/variables";
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
    clubCardPrice,
  };
};

const priceBoxExisted = (productDataDom: any) => {
  const priceDOM = new JSDOM(
    productDataDom.window.document
      .querySelector(".product-price-block")
      .innerHTML.split(`<div class="price-container">`)[1]
  );

  const firstPriceBox = productDataDom.window.document.querySelector(
    ".product-price-block"
  )
    ? true
    : false;

  const secondPriceBox = priceDOM.window.document.querySelector(
    "meta[itemprop='price']"
  )
    ? true
    : false;

  return firstPriceBox && secondPriceBox;
};

export const extractGalenProductInfo = (
  stringHTML: string | undefined
): ExtractedProductData | undefined => {
  const productDataDom: any = new JSDOM(stringHTML);

  if (!productDataDom) return;

  const priceDOM = new JSDOM(
    productDataDom.window.document
      .querySelector(".product-price-block")
      .innerHTML.split(`<div class="price-container">`)[1]
  );

  const buyButton = productDataDom.window.document.querySelector(
    "#product-addtocart-button"
  );

  const isProductAvailable = buyButton && !buyButton.disabled;

  const priceBox = priceBoxExisted(productDataDom);

  const productId = productDataDom.window.document
    .querySelector(".text-primary-lighter")
    ?.innerHTML.replace(`<span class="font-semibold">Арт. №</span>`, "")
    .trim();

  const image = productDataDom.window.document
    .getElementsByTagName("img")[0]
    ?.getAttribute("src");

  const title = productDataDom.window.document
    .querySelector("h1")
    ?.innerHTML.trim();

  const manufacturer = productDataDom.window.document
    ?.querySelector(".product-attribute-value")
    .innerHTML.trim();

  const { regularPrice, discountPrice, clubCardPrice } = getProductPrices(
    priceBox ? priceDOM : undefined
  );

  return {
    productId: productId ? productId : generalVars.MISSING_ID,
    image: image ? image : generalVars.MISSING_IMAGE,
    title,
    manufacturer: manufacturer
      ? manufacturer
      : generalVars.MISSING_MANUFACTURER,
    regularPrice,
    discountPrice,
    clubCardPrice,
    available: isProductAvailable && priceBox ? true : false,
  };
};
