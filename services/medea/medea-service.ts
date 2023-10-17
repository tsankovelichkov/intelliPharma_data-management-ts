import { generalVars, medeaVars } from "../../variables/variables";

import jsdom from "jsdom";
import { stableConnectionFetch } from "../general/general-service";
import { throwError } from "../../utils/general/general-util";
const { JSDOM } = jsdom;

export const fetchMedeaSitemapData = async (): Promise<
  NodeListOf<HTMLElement> | undefined
> => {
  try {
    const fetchFunc = async () => {
      const sitemap = await fetch(medeaVars.SITEMAP_URL)
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

export const fetchMedeaProductData = async (
  productLink: string | undefined
): Promise<string | undefined> => {
  if (!productLink) return;

  try {
    const fetchFunc = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchExpression: any = await fetch(productLink)
        .then((res) => res.text())
        .then((res) => {
          const dom = new JSDOM(res);

          if (!dom.window.document.querySelector(".productView")) return;

          const htmlEl = dom.window.document.querySelector(
            ".productView"
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
