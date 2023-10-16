import jsdom from "jsdom";
import Nightmare from "nightmare";
import { epharmaVars, generalVars } from "../../variables/variables";
import { stableConnectionFetch } from "../general/general-service";
import { throwError } from "../../utils/general/general-util";
const { JSDOM } = jsdom;

export const fetchEpharmaSitemapData = async (): Promise<
  NodeListOf<HTMLElement> | undefined
> => {
  try {
    const fetchFunc = async () => {
      const sitemap = await fetch(epharmaVars.SITEMAP_URL)
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

export const fetchEpharmaProductData = async (
  productLink: string | undefined
): Promise<string | undefined> => {
  if (!productLink || !productLink.includes("-1-")) return;
  const nightmare = new Nightmare();

  try {
    const fetchFunc = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchExpression: any = await nightmare
        .goto(productLink)
        .evaluate(() => {
          if (!document.querySelector(".jq-product-details")) return;
          const htmlEl = document.querySelector(
            ".jq-product-details"
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
