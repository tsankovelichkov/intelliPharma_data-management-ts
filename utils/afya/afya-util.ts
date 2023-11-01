import { ExtractedProductData, Prices } from "../../interfaces/interfaces";
import { generalVars, pharmacyVars } from "../../variables/variables";

import jsdom from "jsdom";
const { JSDOM } = jsdom;

/* eslint-disable @typescript-eslint/no-explicit-any */
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
    clubCardPrice,
  };
};

export const extractAfyaProductInfo = (
  stringHTML: string | undefined
): ExtractedProductData | undefined => {
  if (!stringHTML) return;

  const productDataDom: any = new JSDOM(stringHTML);

  const buyButton =
    productDataDom.window.document.querySelector("#buttonAddToCart");

  const isProductAvailable = buyButton && !buyButton.disabled;

  const priceBox = productDataDom.window.document.querySelector(".currPrice");

  if (!productDataDom) return;

  const productId = productDataDom.window.document
    .querySelector(".barcode")
    ?.innerHTML.replace("арт. № ", "")
    .trim();

  let image = generalVars.MISSING_IMAGE;

  const title = productDataDom.window.document.querySelector("h1").innerHTML;

  let manufacturer = generalVars.MISSING_MANUFACTURER;

  const { regularPrice, discountPrice, clubCardPrice } = getProductPrices(
    priceBox ? productDataDom : undefined
  );

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
