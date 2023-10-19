import { PharmacyVars } from "../interfaces/interfaces";

export const generalVars = {
  MISSING_IMAGE: "IMAGE IS MISSING",
  MISSING_ID: "MISSING ID",
  MISSING_MANUFACTURER: "MISSING MANUFACTURER",
  PRODUCT_SAVED: "Product Saved",
  PRODUCT_UPDATED: "Product Updated",
  DB_CONNECT: "connect to db",
  COLLECT_DATA_END: "END OF COLLECTING DATA",
  NaN_VALUE: "NaN value",
  STANDARD_TERMINATION_TIME: 900000,
};

export const pharmacyVars: PharmacyVars = {
  SOPHARMACY: {
    NAME: "SOPHARMACY",
    SITEMAP_URL: "https://sopharmacy.bg/sitemap.xml",
    ROOT_URL: "https://sopharmacy.bg/",
    TARGET_CLASS: ".product__preview",
  },
  MEDEA: {
    NAME: "MEDEA",
    SITEMAP_URL: "https://aptekamedea.bg/sitemaps/bg/sitemap_products_bg.xml",
    TARGET_CLASS: ".productView",
  },
  EPHARMA: {
    NAME: "EPHARMA",
    SITEMAP_URL: "https://epharma.bg/sitemap.xml",
    ROOT_URL: "https://epharma.bg",
    TARGET_CLASS: ".jq-product-details",
  },
} as PharmacyVars;

export const allowedRetailCompanies = ["SOPHARMACY", "EPHARMA", "MEDEA"];
