import { basicCollector } from "../data-collectors/basic-collector";
import {
  fetchEpharmaProductData,
  fetchEpharmaSitemapData,
} from "../services/epharma/epharma-service";
import { extractEpharmaProductInfo } from "../utils/epharma/epharma-util";
import { epharmaVars } from "../variables/variables";

basicCollector(
  epharmaVars.NAME,
  fetchEpharmaSitemapData,
  fetchEpharmaProductData,
  extractEpharmaProductInfo
);
