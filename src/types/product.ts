export interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  images?: string[];
  description: string;
  specifications?: string;
  is_description_active?: boolean;
  is_images_active?: boolean;
  is_specifications_active?: boolean;
  is_featured?: boolean;
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
  items: OrderItem[];
  payment_method?: string;
  transaction_id?: string;
  tracking_updates?: any[];
  created_at?: string;
  updated_at?: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at?: string;
}
