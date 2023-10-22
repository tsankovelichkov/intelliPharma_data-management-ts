import { ExtractedProductData, Prices } from "../../interfaces/interfaces";

import jsdom from "jsdom";
import { generalVars } from "../../variables/variables";
const { JSDOM } = jsdom;

/* eslint-disable @typescript-eslint/no-explicit-any */
const getProductPrices = (productDataDom: any): Prices => {
  let regularPrice = 0;
  let discountPrice = 0;

  const firstDigitPrice = productDataDom.window.document
    .querySelector(".Price__PriceLabel-sc-14hy5o8-1")
    .firstElementChild.innerHTML.split("<")[0];
  const secondDigitPrice = productDataDom.window.document
    .querySelector(".Price__Pennies-sc-14hy5o8-5")
    .innerHTML.replace(".<!-- -->", "");

  if (
    productDataDom.window.document.querySelector(
      ".Price__DiscountedPrice-sc-14hy5o8-7"
    )
  ) {
    const firstDigitStandardPrice = productDataDom.window.document
      .querySelector(".dnhajL")
      .innerHTML.split("<")[0];
    const secondDigitStandardPrice = productDataDom.window.document
      .querySelector(".EXMLT")
      .innerHTML.replace(".<!-- -->", "");

    regularPrice = Number(
      firstDigitStandardPrice + "." + secondDigitStandardPrice
    );
    discountPrice = Number(firstDigitPrice + "." + secondDigitPrice);
  } else {
    regularPrice = Number(firstDigitPrice + "." + secondDigitPrice);
  }

  return {
    regularPrice,
    discountPrice,
    clubCardPrice: 0,
  };
};

export const extractRemediumProductInfo = (
  stringHTML: string | undefined
): ExtractedProductData | undefined => {
  if (!stringHTML) return;

  const productDataDom: any = new JSDOM(stringHTML);

  if (!productDataDom) return;

  const productId = productDataDom.window.document
    .querySelector(".fbJKcE")
    .innerHTML.replace(": <!-- -->", "")
    .replace("Продуктов код", "");

  let image = generalVars.MISSING_IMAGE;

  const title = productDataDom.window.document.querySelector(
    ".ProductDescription__ProductDescriptionLabel-sc-t2m2b9-0"
  ).innerHTML;

  let manufacturer = generalVars.MISSING_MANUFACTURER;

  const { regularPrice, discountPrice, clubCardPrice } =
    getProductPrices(productDataDom);

  if (productDataDom.window.document.querySelector("picture")) {
    image = productDataDom.window.document
      .querySelector("picture")
      .firstElementChild.getAttribute("srcset");
  }

  if (
    productDataDom.window.document.querySelector(
      ".BrandName__BrandNameAnchor-sc-1dm3h3n-1"
    )
  ) {
    manufacturer = productDataDom.window.document.querySelector(
      ".BrandName__BrandNameAnchor-sc-1dm3h3n-1"
    ).lastElementChild.innerHTML;
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
