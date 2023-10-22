import { basicCollector } from "../data-collectors/basic-collector";
import {
  fetchDefaultProduct,
  fetchDefaultSitemap,
} from "../services/general/general-service";
import { extractGalenProductInfo } from "../utils/galen/galen-util";
import { pharmacyVars } from "../variables/variables";

basicCollector(
  pharmacyVars.GALEN.NAME,
  fetchDefaultSitemap,
  fetchDefaultProduct,
  extractGalenProductInfo
);
