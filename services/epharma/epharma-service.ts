import { pharmacyVars } from "../../variables/variables";
import { puppeteerProductFetch } from "../general/general-service";

export const fetchEpharmaProductData = async (
  productLink: string | undefined
): Promise<string | undefined> => {
  if (!productLink || !productLink.includes("-1-")) return;

  const evaluateFunc = () => {
    if (!document.querySelector(pharmacyVars.EPHARMA.TARGET_CLASS)) return;
    return document.querySelector(pharmacyVars.EPHARMA.TARGET_CLASS)?.innerHTML;
  };

  const response = await puppeteerProductFetch(
    productLink,
    evaluateFunc,
    pharmacyVars.EPHARMA.ADD_TO_CART_BUTTON_SELECTOR
  );

  return response;
};
