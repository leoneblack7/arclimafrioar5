export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images: string[];
  additionalImages?: string[];
  description: string;
  isDescriptionActive?: boolean;
  isImagesActive?: boolean;
  isSpecificationsActive?: boolean;
  isAdditionalImagesActive?: boolean;
  isRelatedProductsActive?: boolean;
  relatedProductIds?: number[];
  specifications?: string;
  active: boolean;
  pixLink?: string;
}