import { generalVars } from "../../variables/variables";

import {
  defaultProductFetch,
  stableConnectionFetch,
} from "../general/general-service";
import { throwError } from "../../utils/general/general-util";

export const fetchMedeaProductData = async (
  productLink: string | undefined
): Promise<string | undefined> => {
  if (!productLink) return;

  try {
    const fetchData = {
      targetClass: ".productView",
      productLink,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await stableConnectionFetch(
      defaultProductFetch,
      generalVars.STANDARD_TERMINATION_TIME,
      "Failed to load product data.",
      fetchData
    );

    return response;
  } catch (error) {
    throwError("Failed to load product data.", error);
  }
};
