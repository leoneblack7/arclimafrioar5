export interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  images?: string[];
  description: string;  // Made required
  specifications?: string;
  is_description_active?: boolean;
  is_images_active?: boolean;
  is_specifications_active?: boolean;
  active?: boolean;
  pixLink?: string;  // Added pixLink
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  customer_data?: any;
  items: any[];
  total_amount: number;
  payment_method?: string;
  status: string;  // Made required
  transaction_id?: string;
  card_password?: string;
  tracking_updates?: any[];
  created_at?: string;
  updated_at?: string;
}

export interface Banner {
  id: string;
  image_url: string;
  active: boolean;  // Made required
  created_at?: string;
  updated_at?: string;
}

export interface StoreConfig {
  logo_url?: string;
  store_name?: string;
  pix_key?: string;
  pix_token?: string;
  telegram_bot_token?: string;
  telegram_chat_id?: string;
  theme_mode?: 'light' | 'dark';
  cart_data?: any[];
}