import { basicCollector } from "../data-collectors/basic-collector";
import {
  fetchSopharmacyProductData,
  fetchSopharmacySitemapData,
} from "../services/sopharmacy/sopharmacy-service";
import { extractSopharmacyProductInfo } from "../utils/sopharmacy/sopharmacy-util";
import { pharmacyVars } from "../variables/variables";

basicCollector(
  pharmacyVars.SOPHARMACY.NAME,
  fetchSopharmacySitemapData,
  fetchSopharmacyProductData,
  extractSopharmacyProductInfo
);
