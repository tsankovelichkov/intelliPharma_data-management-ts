import { generalVars, pharmacyVars } from "../../variables/variables";
import jsdom from "jsdom";
import {
  puppeteerProductFetch,
  stableConnectionFetch,
} from "../general/general-service";
import { throwError } from "../../utils/general/general-util";
const { JSDOM } = jsdom;

export const fetchSopharmacySitemapData = async (
  url?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[] | NodeListOf<HTMLElement> | undefined> => {
  if (!url) return;
  try {
    const fetchFunc = async () => {
      const sitemapURL = await fetch(url)
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

  const evaluateFunc = () => {
    if (!document.querySelector(pharmacyVars.SOPHARMACY.TARGET_CLASS)) return;

    return document.querySelector(pharmacyVars.SOPHARMACY.TARGET_CLASS)
      ?.innerHTML;
  };

  const response = await puppeteerProductFetch(
    productLink,
    evaluateFunc,
    pharmacyVars.SOPHARMACY.ADD_TO_CART_BUTTON_SELECTOR
  );

  return response;
};
