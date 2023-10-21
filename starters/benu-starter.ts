import { basicCollector } from "../data-collectors/basic-collector";
import {
  fetchDefaultProduct,
  fetchDefaultSitemap,
} from "../services/general/general-service";
import { extractBenuProductInfo } from "../utils/benu/benu-util";
import { pharmacyVars } from "../variables/variables";

basicCollector(
  pharmacyVars.BENU.NAME,
  fetchDefaultSitemap,
  fetchDefaultProduct,
  extractBenuProductInfo
);
