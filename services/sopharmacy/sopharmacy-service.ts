import { sopharmacyVars } from "../../variables/variables";
import jsdom from "jsdom";
import { fetchProductData } from "../general/general-service";
const { JSDOM } = jsdom;

export const fetchSopharmacySitemapData = async (): Promise<
  HTMLCollection | undefined
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

      if (!dom.window.document.querySelector("urlset")) return;

      const htmlEl = dom.window.document.querySelector("urlset") as HTMLElement;
      return htmlEl.innerHTML;
    });

  const sitemapDom = new JSDOM(sitemap);

  const sitemapProducts =
    sitemapDom.window.document.getElementsByTagName("loc");

  return sitemapProducts;
};

export const fetchSopharmacyProductData = async (
  productLink: string | undefined,
  terminationTime: number
): Promise<string | undefined> => {
  if (!productLink) return;
  // eslint-disable-next-line no-constant-condition
  const urlFetch = fetch(productLink)
    .then((res) => res.text())
    .then((res) => {
      const dom = new JSDOM(res);

      if (!dom.window.document.querySelector(".product__preview")) return;

      const htmlEl = dom.window.document.querySelector(
        ".product__preview"
      ) as HTMLElement;

      return htmlEl.innerHTML;
    });

  return await fetchProductData(urlFetch, terminationTime);
};
