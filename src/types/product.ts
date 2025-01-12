export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  active: boolean;
  pixLink?: string;
  specifications?: {
    warranty: string;
    technical: Record<string, string>;
    components: Record<string, string>;
  };
}