/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Prices {
  regularPrice: number;
  discountPrice: number;
  clubCardPrice: number;
}

export interface ProductDataForUpdate {
  productId?: string;
  image?: string;
  title?: string;
  manufacturer?: string;
  retailCompany?: Pharmacies;
  regularPrice?: number;
  discountPrice?: number;
  clubCardPrice?: number;
  available: boolean;
  link?: string;
}

export interface ExtractedProductData {
  productId: string;
  image: string;
  title: string;
  manufacturer: string;
  regularPrice: number;
  discountPrice: number;
  clubCardPrice: number;
  available: boolean;
}

export interface ProductData {
  productId: string;
  image: string;
  title: string;
  manufacturer: string;
  retailCompany: Pharmacies;
  regularPrice: number;
  discountPrice: number;
  clubCardPrice: number;
  available: boolean;
  link: string;
}

export type Pharmacies =
  | "EPHARMA"
  | "SOPHARMACY"
  | "MEDEA"
  | "AFYA"
  | "BENU"
  | "GALEN"
  | "REMEDIUM";

export interface DefaultVarData {
  NAME: Pharmacies;
  SITEMAP_URL: string;
  TARGET_CLASS: string;
  ROOT_URL?: string;
  ADD_TO_CART_BUTTON_SELECTOR?: string;
}

export interface PharmacyVars {
  SOPHARMACY: DefaultVarData;
  EPHARMA: DefaultVarData;
  MEDEA: DefaultVarData;
  AFYA: DefaultVarData;
  BENU: DefaultVarData;
  GALEN: DefaultVarData;
  REMEDIUM: DefaultVarData;
}

export interface ExistingProductData extends ProductData {
  _id: any;
  __v?: number;
  _doc?: any;
}
