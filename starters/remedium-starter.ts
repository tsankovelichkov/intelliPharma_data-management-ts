import { basicCollector } from "../data-collectors/basic-collector";
import { fetchDefaultProduct } from "../services/general/general-service";
import { fetchRemediumSitemapData } from "../services/remedium/remedium-service";
import { extractRemediumProductInfo } from "../utils/remedium/remedium-util";
import { pharmacyVars } from "../variables/variables";

basicCollector(
  pharmacyVars.REMEDIUM.NAME,
  fetchRemediumSitemapData,
  fetchDefaultProduct,
  extractRemediumProductInfo
);
