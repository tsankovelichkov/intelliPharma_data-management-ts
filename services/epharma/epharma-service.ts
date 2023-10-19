import Nightmare from "nightmare";
import { generalVars } from "../../variables/variables";
import { stableConnectionFetch } from "../general/general-service";
import { throwError } from "../../utils/general/general-util";

export const fetchEpharmaProductData = async (
  productLink: string | undefined,
  targetClass: string
): Promise<string | undefined> => {
  if (!productLink || !productLink.includes("-1-")) return;
  const nightmare = new Nightmare();

  try {
    const fetchFunc = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchExpression: any = await nightmare
        .goto(productLink)
        .evaluate(() => {
          if (!document.querySelector(targetClass)) return;
          const htmlEl = document.querySelector(targetClass) as HTMLElement;
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
