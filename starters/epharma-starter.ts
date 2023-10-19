import { basicCollector } from "../data-collectors/basic-collector";
import { fetchEpharmaProductData } from "../services/epharma/epharma-service";
import { fetchDefaultSitemap } from "../services/general/general-service";
import { extractEpharmaProductInfo } from "../utils/epharma/epharma-util";
import { pharmacyVars } from "../variables/variables";

basicCollector(
  pharmacyVars.EPHARMA.NAME,
  fetchDefaultSitemap,
  fetchEpharmaProductData,
  extractEpharmaProductInfo,
  ".jq-product-details"
);
