import { generalVars, sopharmacyVars } from "../../variables/variables";
import jsdom from "jsdom";
import { stableConnectionFetch } from "../general/general-service";
import { throwError } from "../../utils/general/general-util";
const { JSDOM } = jsdom;

export const fetchSopharmacySitemapData = async (): Promise<
  NodeListOf<HTMLElement> | undefined
> => {
  try {
    const fetchFunc = async () => {
      const sitemapURL = await fetch(sopharmacyVars.SITEMAP_URL)
        .then((res) => res.text())
        .then((res) => {
          const dom = new JSDOM(res);

          if (!dom.window.document.querySelector("loc")) return;

          const htmlEl = dom.window.document.querySelector(
            "loc"
          ) as HTMLElement;
          return htmlEl.innerHTML;
        });

      if (!sitemapURL) return;

      const sitemap = await fetch(sitemapURL)
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

    const response = stableConnectionFetch(
      fetchFunc,
      generalVars.STANDARD_TERMINATION_TIME,
      "Failed to load sitemap."
    );

    return response;
  } catch (error) {
    throwError("Failed to load sitemap.", error);
  }
};

export const fetchSopharmacyProductData = async (
  productLink: string | undefined
): Promise<string | undefined> => {
  if (!productLink) return;
  // eslint-disable-next-line no-constant-condition
  try {
    const fetchFunc = async () => {
      const fetchExpression = await fetch(productLink)
        .then((res) => res.text())
        .then((res) => {
          const dom = new JSDOM(res);

          if (!dom.window.document.querySelector(".product__preview")) return;

          const htmlEl = dom.window.document.querySelector(
            ".product__preview"
          ) as HTMLElement;

          return htmlEl.innerHTML;
        });

      return fetchExpression;
    };

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
