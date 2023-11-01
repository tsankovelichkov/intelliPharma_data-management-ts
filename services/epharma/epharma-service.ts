import { puppeteerProductFetch } from "../general/general-service";

export const fetchEpharmaProductData = async (
  productLink: string | undefined
): Promise<string | undefined> => {
  if (!productLink || !productLink.includes("-1-")) return;

  const evaluateFunc = () => {
    if (!document.querySelector(".jq-product-details")) return;
    return document.querySelector(".jq-product-details")?.innerHTML;
  };

  const response = await puppeteerProductFetch(productLink, evaluateFunc, 500);

  return response;
};
