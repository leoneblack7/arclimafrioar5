export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  active: boolean;
  pixLink?: string;
}