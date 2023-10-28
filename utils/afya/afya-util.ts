import {
  ExistingProductData,
  ExtractedProductData,
  Prices,
} from "../../interfaces/interfaces";
import { generalVars, pharmacyVars } from "../../variables/variables";

import jsdom from "jsdom";
const { JSDOM } = jsdom;

/* eslint-disable @typescript-eslint/no-explicit-any */
const getProductPrices = (productDataDom: any): Prices => {
  let regularPrice = 0;
  let discountPrice = 0;

  if (productDataDom.window.document.querySelector(".oldPrice")) {
    regularPrice = Number(
      productDataDom.window.document
        .querySelector(".oldPrice")
        .innerHTML.split("<")[0]
    );
    discountPrice = Number(
      productDataDom.window.document
        .querySelector(".currPrice")
        .innerHTML.split("<")[0]
    );
  } else {
    regularPrice = Number(
      productDataDom.window.document
        .querySelector(".currPrice")
        .innerHTML.split("<")[0]
    );
    discountPrice = 0;
  }

  return {
    regularPrice,
    discountPrice,
    clubCardPrice: 0,
  };
};

export const extractAfyaProductInfo = (
  stringHTML: string | undefined,
  existingProductsArr: Array<ExistingProductData>
): ExtractedProductData | undefined => {
  if (!stringHTML) return;

  const productDataDom: any = new JSDOM(stringHTML);
  const isProductAdded = existingProductsArr.length === 1;

  const buyButton =
    productDataDom.window.document.querySelector("#buttonAddToCart");

  const isProductAvailable = buyButton && !buyButton.disabled;

  if (!productDataDom) return;

  if (!productDataDom.window.document.querySelector(".currPrice")) {
    if (!isProductAdded) return;

    const existingProductData = existingProductsArr[0];
    return {
      ...existingProductData,
      available: false,
    };
  }
  const productId = productDataDom.window.document
    .querySelector(".barcode")
    .innerHTML.replace("арт. № ", "")
    .trim();

  let image = generalVars.MISSING_IMAGE;

  const title = productDataDom.window.document.querySelector("h1").innerHTML;

  let manufacturer = generalVars.MISSING_MANUFACTURER;

  const { regularPrice, discountPrice, clubCardPrice } =
    getProductPrices(productDataDom);

  if (productDataDom.window.document.querySelector("picture")) {
    image =
      pharmacyVars.AFYA.ROOT_URL +
      productDataDom.window.document
        .querySelector("picture")
        .lastElementChild.getAttribute("src");
  }

  if (
    productDataDom.window.document.querySelectorAll(".productDetail")[1]
      .lastElementChild.firstElementChild
  ) {
    const manufacturerData = productDataDom.window.document
      .querySelectorAll(".productDetail")[1]
      .lastElementChild.firstElementChild.innerHTML.trim();

    if (manufacturerData !== "") manufacturer = manufacturerData;
  }

  return {
    productId,
    image,
    title,
    manufacturer,
    regularPrice,
    discountPrice,
    clubCardPrice,
    available: isProductAvailable ? true : false,
  };
};
