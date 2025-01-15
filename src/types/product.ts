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
  relatedProductIds?: string[];  // Changed from number[] to string[]
  specifications?: string;
  active?: boolean;
  pixLink?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  user_id?: string;
  status: string;
  total_amount: number;
  customer_data?: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  items: any[];
  payment_method?: string;
  transaction_id?: string;
  tracking_updates?: any[];
  created_at?: string;
  updated_at?: string;
  order_items?: {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
    created_at?: string;
  }[];
}