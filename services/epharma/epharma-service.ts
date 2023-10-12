import jsdom from "jsdom";
import Nightmare from "nightmare";
import { epharmaVars } from "../../variables/variables";
import { fetchProductData } from "../general/general-service";
const { JSDOM } = jsdom;

export const fetchEpharmaSitemapData = async (): Promise<
  NodeListOf<HTMLElement> | undefined
> => {
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

export const fetchEpharmaProductData = async (
  productLink: string | undefined,
  terminationTime: number
): Promise<string | undefined> => {
  if (!productLink || !productLink.includes("-1-")) return;
  const nightmare = new Nightmare();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchExpression: any = nightmare.goto(productLink).evaluate(() => {
    if (!document.querySelector(".jq-product-details")) return;
    const htmlEl = document.querySelector(".jq-product-details") as HTMLElement;
    return htmlEl.innerHTML;
  });

  return await fetchProductData(fetchExpression, terminationTime);
};
