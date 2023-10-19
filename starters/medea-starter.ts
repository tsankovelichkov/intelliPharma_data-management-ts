import { basicCollector } from "../data-collectors/basic-collector";
import {
  fetchDefaultProduct,
  fetchDefaultSitemap,
} from "../services/general/general-service";
import { extractMedeaProductInfo } from "../utils/medea/medea-util";
import { pharmacyVars } from "../variables/variables";

basicCollector(
  pharmacyVars.MEDEA.NAME,
  fetchDefaultSitemap,
  fetchDefaultProduct,
  extractMedeaProductInfo,
  ".productView"
);
