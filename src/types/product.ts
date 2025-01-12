export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseProduct {
  id: string;
  title: string;
  price: number;
  image_url: string;
  description: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}