import { nightmareProductFetch } from "../general/general-service";

export const fetchEpharmaProductData = async (
  productLink: string | undefined
): Promise<string | undefined> => {
  if (!productLink || !productLink.includes("-1-")) return;

  const evaluateFunc = () => {
    if (!document.querySelector(".jq-product-details")) return;
    const htmlEl = document.querySelector(".jq-product-details") as HTMLElement;
    return htmlEl.innerHTML;
  };

  const response = await nightmareProductFetch(productLink, evaluateFunc);

  return response;
};
