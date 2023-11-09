/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractedProductData, Prices } from "../../interfaces/interfaces";
import { generalVars, pharmacyVars } from "../../variables/variables";

import jsdom from "jsdom";
const { JSDOM } = jsdom;

const getProductPrices = (productDataDom: any): Prices => {
  let regularPrice;
  let discountPrice;
  let clubCardPrice;

  if (productDataDom.window.document.querySelector(".price--discount")) {
    if (productDataDom.window.document.querySelector(".price__note")) {
      regularPrice = Number(
        productDataDom.window.document
          .querySelector(".price--s")
          .innerHTML.replace("&nbsp;лв.", "")
          .replace(",", ".")
      );
      discountPrice = 0;
      clubCardPrice = Number(
        productDataDom.window.document
          .querySelector(".price--discount")
          .innerHTML.split("<")[0]
          .replace("&nbsp;лв.", "")
          .replace(",", ".")
      );
    } else {
      regularPrice = Number(
        productDataDom.window.document
          .querySelector(".price--s")
          .innerHTML.replace("&nbsp;лв.", "")
          .replace(",", ".")
      );
      discountPrice = Number(
        productDataDom.window.document
          .querySelector(".price--discount")
          .innerHTML.replace("&nbsp;лв.", "")
          .replace(",", ".")
      );
      clubCardPrice = 0;
    }
  } else {
    regularPrice = Number(
      productDataDom.window.document
        .querySelector(".price--l")
        .innerHTML.replace("&nbsp;лв.", "")
        .replace(",", ".")
    );
    discountPrice = 0;
    clubCardPrice = 0;
  }

  return {
    regularPrice,
    discountPrice,
    clubCardPrice,
  };
};

const getProductImage = (productDataDom: any): string => {
  let image;

  if (productDataDom.window.document.querySelector(".product__img")) {
    image =
      pharmacyVars.SOPHARMACY.ROOT_URL +
      productDataDom.window.document
        .querySelector(".product__img")
        ?.getAttribute("data-srcset");
  } else {
    image = generalVars.MISSING_IMAGE;
  }

  return image;
};

export const extractSopharmacyProductInfo = (
  stringHTML: string | undefined
): ExtractedProductData | undefined => {
  if (!stringHTML) return;

  const isProductAvailable = !stringHTML.includes(
    generalVars.MISSING_ADD_TO_CART_BUTTON
  );

  const productDataDom: any = new JSDOM(stringHTML);

  const productId = productDataDom.window.document
    .querySelectorAll("small")[1]
    ?.innerHTML.trim();

  const image = getProductImage(productDataDom);

  const title =
    productDataDom.window.document.querySelector(".product__heading").innerHTML;

  const manufacturerBase =
    productDataDom.window.document.querySelectorAll(".button__container");

  const manufacturer = manufacturerBase[
    isProductAvailable ? 4 : 3
  ].lastElementChild?.innerHTML
    .replace("Всичкo от ", "")
    .trim();

  const { regularPrice, discountPrice, clubCardPrice } =
    getProductPrices(productDataDom);

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
    available: isProductAvailable ? true : false,
  };
};
