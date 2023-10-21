import { basicCollector } from "../data-collectors/basic-collector";
import {
  fetchDefaultProduct,
  fetchDefaultSitemap,
} from "../services/general/general-service";
import { extractAfyaProductInfo } from "../utils/afya/afya-util";
import { pharmacyVars } from "../variables/variables";

basicCollector(
  pharmacyVars.AFYA.NAME,
  fetchDefaultSitemap,
  fetchDefaultProduct,
  extractAfyaProductInfo
);
