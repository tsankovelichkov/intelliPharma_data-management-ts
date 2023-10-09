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
  retailCompany?: string;
  regularPrice?: number;
  discountPrice?: number;
  clubCardPrice?: number;
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
}

export interface ProductData {
  productId: string;
  image: string;
  title: string;
  manufacturer: string;
  retailCompany: string;
  regularPrice: number;
  discountPrice: number;
  clubCardPrice: number;
  link: string;
}

export interface ExistingProductData extends ProductData {
  _id: any;
  __v?: number;
  _doc?: any;
}
