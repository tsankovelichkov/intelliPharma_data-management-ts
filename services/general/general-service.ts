/* eslint-disable @typescript-eslint/no-explicit-any */
import puppeteer from "puppeteer";
import jsdom from "jsdom";
import { databaseInsert, databaseUpdate } from "../../database/database";
import {
  ExistingProductData,
  ProductData,
  ProductDataForUpdate,
} from "../../interfaces/interfaces";
import { throwError } from "../../utils/general/general-util";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { generalVars } from "../../variables/variables";
const { JSDOM } = jsdom;

export const stableConnectionFetch = async (
  fetchFunc: () => Promise<any>,
  terminationTime: number,
  errorStr: string
) => {
  const enterenceTime = new Date().getTime();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const response = await fetchFunc();

      return response;
    } catch (error) {
      const timeAtTheMoment = new Date().getTime();

      //TO-DO: if statement for LAN error
      if (timeAtTheMoment - enterenceTime > terminationTime)
        throwError(errorStr, error);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

export const puppeteerProductFetch = async (
  productLink: string,
  evaluateFunc: () => string | undefined,
  targetSelector: string | undefined
) => {
  if (!targetSelector) return;

  try {
    const fetchFunc = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(productLink);

      try {
        await page.waitForSelector(targetSelector);

        const htmlString = await page?.evaluate(evaluateFunc);

        browser.close();

        return htmlString;
      } catch (error: any) {
        if (error.message.includes("Waiting for selector")) {
          await page.goto(productLink);

          const htmlString = await page?.evaluate(evaluateFunc);

          browser.close();

          return htmlString + generalVars.MISSING_ADD_TO_CART_BUTTON;
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await stableConnectionFetch(
      fetchFunc,
      generalVars.STANDARD_TERMINATION_TIME,
      "Failed to load product data."
    );

    return response;
  } catch (error) {
    throwError("Failed to load product data.", error);
  }
};

export const fetchDefaultProduct = async (
  productLink: string | undefined,
  targetClass: string
) => {
  if (!productLink) return;
  try {
    const fetchFunc = async () => {
      const fetchExpression = await fetch(productLink)
        .then((res) => res.text())
        .then((res) => {
          const dom = new JSDOM(res);

          if (!dom.window.document.querySelector(targetClass)) return;

          const htmlEl = dom.window.document.querySelector(
            targetClass
          ) as HTMLElement;

          return htmlEl.innerHTML;
        });

      return fetchExpression;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await stableConnectionFetch(
      fetchFunc,
      generalVars.STANDARD_TERMINATION_TIME,
      "Failed to load product data."
    );

    return response;
  } catch (error) {
    throwError("Failed to load product data.", error);
  }
};

export const fetchDefaultSitemap = async (
  url?: string
): Promise<NodeListOf<HTMLElement> | undefined> => {
  if (!url) return;
  try {
    const fetchFunc = async () => {
      const sitemap = await fetch(url)
        .then((res) => res.text())
        .then((res) => {
          const dom = new JSDOM(res);

          if (!dom.window.document.querySelector("loc")) return;

          return dom.window.document.querySelectorAll(
            "loc"
          ) as NodeListOf<HTMLElement>;
        });

      return sitemap;
    };

    const response = await stableConnectionFetch(
      fetchFunc,
      generalVars.STANDARD_TERMINATION_TIME,
      "Failed to load sitemap."
    );

    return response;
  } catch (error) {
    throwError("Failed to load sitemap.", error);
  }
};

export const addProduct = async (
  data: ProductData
): Promise<string | undefined> => {
  try {
    const response = await databaseInsert(data);
    return response;
  } catch (error) {
    throwError("Failed to add product in database.", error);
  }
};

export const updateProduct = async (
  existingProductsArr: Array<ExistingProductData>,
  dataForUpdate: ProductDataForUpdate | undefined
) => {
  if (!dataForUpdate) return;

  if (existingProductsArr.length > 1) return;

  const existingProduct = existingProductsArr[0];

  const productId = existingProduct._id;

  const dataForUpdateExists = Object.keys(dataForUpdate).length;

  if (!dataForUpdateExists) return;

  try {
    const response = await databaseUpdate(productId, dataForUpdate);

    return response;
  } catch (error) {
    throwError("Failed to update product in database.", error);
  }
};
