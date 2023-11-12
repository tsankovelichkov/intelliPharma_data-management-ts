import { basicCollector } from "../data-collectors/basic-collector";
import { fetchDefaultProduct } from "../services/general/general-service";
import { fetchSopharmacySitemapData } from "../services/sopharmacy/sopharmacy-service";
import { extractSopharmacyProductInfo } from "../utils/sopharmacy/sopharmacy-util";
import { pharmacyVars } from "../variables/variables";

basicCollector(
  pharmacyVars.SOPHARMACY.NAME,
  fetchSopharmacySitemapData,
  fetchDefaultProduct,
  extractSopharmacyProductInfo
);
