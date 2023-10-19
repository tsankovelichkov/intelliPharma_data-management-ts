import { generalVars } from "../../variables/variables";
import jsdom from "jsdom";
import { stableConnectionFetch } from "../general/general-service";
import { throwError } from "../../utils/general/general-util";
const { JSDOM } = jsdom;

export const fetchSopharmacySitemapData = async (
  url: string
): Promise<NodeListOf<HTMLElement> | undefined> => {
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
