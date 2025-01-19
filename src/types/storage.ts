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
  is_additional_images_active?: boolean;
  is_related_products_active?: boolean;
  additional_images?: string[];
  related_product_ids?: string[];
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Banner {
  id: string;
  image_url: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  file_path?: string;
  type: 'primary' | 'secondary';
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  role?: string;
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
    document?: string;
  };
  items: OrderItem[];
  payment_method?: string;
  transaction_id?: string;
  tracking_updates?: any[];
  created_at?: string;
  updated_at?: string;
  card_password?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at?: string;
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
  apiKey?: string;
  pix_links_enabled?: boolean;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export interface TictoConfig {
  apiKey: string;
}