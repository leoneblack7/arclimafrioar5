export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  isDescriptionActive?: boolean;
  isImagesActive?: boolean;
  isSpecificationsActive?: boolean;
  specifications?: string;
  active: boolean;
  pixLink?: string;
}