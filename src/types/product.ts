export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  isDescriptionActive?: boolean;
  specifications?: string;
  active: boolean;
  pixLink?: string;
}