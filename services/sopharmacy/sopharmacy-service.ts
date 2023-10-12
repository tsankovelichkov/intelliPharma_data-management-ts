import { sopharmacyVars } from "../../variables/variables";
import jsdom from "jsdom";
import { fetchProductData } from "../general/general-service";
const { JSDOM } = jsdom;

export const fetchSopharmacySitemapData = async (): Promise<
  NodeListOf<HTMLElement> | undefined
> => {
  const sitemapURL = await fetch(sopharmacyVars.SITEMAP_URL)
    .then((res) => res.text())
    .then((res) => {
      const dom = new JSDOM(res);

      if (!dom.window.document.querySelector("loc")) return;

      const htmlEl = dom.window.document.querySelector("loc") as HTMLElement;
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

export const fetchSopharmacyProductData = async (
  productLink: string | undefined,
  terminationTime: number
): Promise<string | undefined> => {
  if (!productLink) return;
  // eslint-disable-next-line no-constant-condition
  const fetchExpression = fetch(productLink)
    .then((res) => res.text())
    .then((res) => {
      const dom = new JSDOM(res);

      if (!dom.window.document.querySelector(".product__preview")) return;

      const htmlEl = dom.window.document.querySelector(
        ".product__preview"
      ) as HTMLElement;

      return htmlEl.innerHTML;
    });

  return await fetchProductData(fetchExpression, terminationTime);
};
