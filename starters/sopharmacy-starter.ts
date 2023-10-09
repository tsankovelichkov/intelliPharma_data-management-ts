import { basicCollector } from "../data-collectors/basic-collector";
import {
  fetchSopharmacyProductData,
  fetchSopharmacySitemapData,
} from "../services/sopharmacy/sopharmacy-service";
import { extractSopharmacyProductInfo } from "../utils/sopharmacy/sopharmacy-util";
import { sopharmacyVars } from "../variables/variables";

basicCollector(
  sopharmacyVars.NAME,
  fetchSopharmacySitemapData,
  fetchSopharmacyProductData,
  extractSopharmacyProductInfo
);
