import { basicCollector } from "../data-collectors/basic-collector";
import {
  fetchMedeaProductData,
  fetchMedeaSitemapData,
} from "../services/medea/medea-service";
import { extractMedeaProductInfo } from "../utils/medea/medea-util";
import { medeaVars } from "../variables/variables";

basicCollector(
  medeaVars.NAME,
  fetchMedeaSitemapData,
  fetchMedeaProductData,
  extractMedeaProductInfo
);
