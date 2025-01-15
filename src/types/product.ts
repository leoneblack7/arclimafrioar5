export interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  images?: string[];
  additionalImages?: string[];
  description: string;
  isDescriptionActive?: boolean;
  isImagesActive?: boolean;
  isSpecificationsActive?: boolean;
  isAdditionalImagesActive?: boolean;
  isRelatedProductsActive?: boolean;
  relatedProductIds?: string[];
  specifications?: string;
  active?: boolean;
  pixLink?: string;
  created_at?: string;
  updated_at?: string;
}