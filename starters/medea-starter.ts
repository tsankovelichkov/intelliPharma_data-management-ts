import { basicCollector } from "../data-collectors/basic-collector";
import { fetchDefaultSitemap } from "../services/general/general-service";
import { fetchMedeaProductData } from "../services/medea/medea-service";
import { extractMedeaProductInfo } from "../utils/medea/medea-util";
import { pharmacyVars } from "../variables/variables";

basicCollector(
  pharmacyVars.MEDEA.NAME,
  fetchDefaultSitemap,
  fetchMedeaProductData,
  extractMedeaProductInfo
);
