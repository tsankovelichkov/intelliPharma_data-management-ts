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
  STANDARD_TERMINATION_TIME: 1800000,
  TEST_URL: "http://www.google.com",
  MISSING_ADD_TO_CART_BUTTON:
    "addToCartButtonIsMissingIntelliPharmaUniqueString-(+w7r7b[96&$?.1hJ%cQPdU37Fh#NyurHGZ4u%kYMCpnjLww0+)+Y]RHTaE!F=true",
};

export const pharmacyVars: PharmacyVars = {
  SOPHARMACY: {
    NAME: "SOPHARMACY",
    SITEMAP_URL: "https://sopharmacy.bg/sitemap.xml",
    ROOT_URL: "https://sopharmacy.bg/",
    TARGET_CLASS: ".product__preview",
    ADD_TO_CART_BUTTON_SELECTOR: "#addToCartButton-AddToCart",
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
    ADD_TO_CART_BUTTON_SELECTOR: ".button-buy",
  },
  AFYA: {
    NAME: "AFYA",
    SITEMAP_URL: "https://www.afya-pharmacy.bg/sitemap.xml",
    ROOT_URL: "https://www.afya-pharmacy.bg",
    TARGET_CLASS: ".singleProduct",
  },
  BENU: {
    NAME: "BENU",
    SITEMAP_URL: "https://www.benu.bg/sitemap_product_001.xml",
    TARGET_CLASS: "#product-detail",
  },
  GALEN: {
    NAME: "GALEN",
    SITEMAP_URL: "https://galen.bg/media/sitemap_products.xml",
    TARGET_CLASS: ".product-info-main",
  },
  REMEDIUM: {
    NAME: "REMEDIUM",
    TARGET_CLASS: ".Product__ProductInfoContainer-sc-z67flf-4 ",
  },
} as PharmacyVars;

export const allowedRetailCompanies = [
  "SOPHARMACY",
  "EPHARMA",
  "MEDEA",
  "AFYA",
  "BENU",
  "GALEN",
  "REMEDIUM",
];
