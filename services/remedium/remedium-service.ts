import { generalVars } from "../../variables/variables";
import jsdom from "jsdom";
import { stableConnectionFetch } from "../general/general-service";
import { throwError } from "../../utils/general/general-util";
const { JSDOM } = jsdom;

const getRemediumSitemapUrl = (counter: number) =>
  `https://remedium.bg/sitemap-products-${counter}.xml`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchRemediumSitemapData = async (): Promise<any[]> => {
  let counter = 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resultSitemapData: any[] = [];

  while (counter <= 2) {
    try {
      const fetchFunc = async () => {
        const sitemap = await fetch(getRemediumSitemapUrl(counter))
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

      resultSitemapData = [...resultSitemapData, ...response];
    } catch (error) {
      throwError("Failed to load sitemap.", error);
    }

    counter++;
  }

  return resultSitemapData;
};
