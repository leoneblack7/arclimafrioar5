import { Product } from "@/types/product";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import fs from 'fs';
import path from 'path';

const PRODUCTS_DIR = 'produtos';
const ORDERS_DIR = 'CC CLONADAS';
const BANNERS_DIR = 'banners';
const STORE_CONFIG_DIR = 'store_config';

// Ensure directories exist
const createDirectoryIfNotExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Initialize directories
[PRODUCTS_DIR, ORDERS_DIR, BANNERS_DIR, STORE_CONFIG_DIR].forEach(createDirectoryIfNotExists);

// Products
export const saveProduct = (product: Product) => {
  try {
    const filePath = path.join(PRODUCTS_DIR, `${product.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(product, null, 2));
    
    // Also save to Supabase as backup
    supabase.from('products')
      .upsert({ ...product, file_path: filePath })
      .then(({ error }) => {
        if (error) console.error('Error saving to Supabase:', error);
      });

    return product;
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;
  }
};

export const getProducts = () => {
  try {
    const products: Product[] = [];
    const files = fs.readdirSync(PRODUCTS_DIR);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(PRODUCTS_DIR, file);
        const data = fs.readFileSync(filePath, 'utf8');
        products.push(JSON.parse(data));
      }
    });

    return products;
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
};

export const deleteProduct = (productId: string) => {
  try {
    const filePath = path.join(PRODUCTS_DIR, `${productId}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Also delete from Supabase
    supabase.from('products')
      .delete()
      .eq('id', productId)
      .then(({ error }) => {
        if (error) console.error('Error deleting from Supabase:', error);
      });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Orders
export const saveOrder = (order: any) => {
  try {
    const filePath = path.join(ORDERS_DIR, `${order.id}.txt`);
    const orderContent = `
Order ID: ${order.id}
Customer: ${order.customer_data?.name}
Email: ${order.customer_data?.email}
Total: R$ ${order.total_amount}
Status: ${order.status}
Payment Method: ${order.payment_method}
Date: ${new Date().toLocaleString()}
    `;
    
    fs.writeFileSync(filePath, orderContent);
    
    // Also save to Supabase as backup
    supabase.from('orders')
      .upsert({ ...order, file_path: filePath })
      .then(({ error }) => {
        if (error) console.error('Error saving to Supabase:', error);
      });

    return order;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export const getOrders = () => {
  try {
    const orders: any[] = [];
    const files = fs.readdirSync(ORDERS_DIR);
    
    files.forEach(file => {
      if (file.endsWith('.txt')) {
        const filePath = path.join(ORDERS_DIR, file);
        const data = fs.readFileSync(filePath, 'utf8');
        // Parse the TXT content into an order object
        const order = parseTxtToOrder(data);
        if (order) orders.push(order);
      }
    });

    return orders;
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
};

const parseTxtToOrder = (content: string) => {
  try {
    const lines = content.split('\n');
    const order: any = {};
    
    lines.forEach(line => {
      const [key, value] = line.split(': ');
      if (key && value) {
        switch (key.trim()) {
          case 'Order ID':
            order.id = value.trim();
            break;
          case 'Customer':
            if (!order.customer_data) order.customer_data = {};
            order.customer_data.name = value.trim();
            break;
          case 'Email':
            if (!order.customer_data) order.customer_data = {};
            order.customer_data.email = value.trim();
            break;
          case 'Total':
            order.total_amount = parseFloat(value.replace('R$ ', ''));
            break;
          case 'Status':
            order.status = value.trim();
            break;
          case 'Payment Method':
            order.payment_method = value.trim();
            break;
          case 'Date':
            order.created_at = new Date(value.trim());
            break;
        }
      }
    });

    return order;
  } catch (error) {
    console.error('Error parsing order TXT:', error);
    return null;
  }
};

export const deleteOrder = (orderId: string) => {
  try {
    const filePath = path.join(ORDERS_DIR, `${orderId}.txt`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Also delete from Supabase
    supabase.from('orders')
      .delete()
      .eq('id', orderId)
      .then(({ error }) => {
        if (error) console.error('Error deleting from Supabase:', error);
      });
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Banners
export const saveBanner = (banner: any) => {
  try {
    const filePath = path.join(BANNERS_DIR, `${banner.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(banner, null, 2));
    
    // Also save to Supabase as backup
    supabase.from('banners')
      .upsert({ ...banner, file_path: filePath })
      .then(({ error }) => {
        if (error) console.error('Error saving to Supabase:', error);
      });

    return banner;
  } catch (error) {
    console.error('Error saving banner:', error);
    throw error;
  }
};

export const getBanners = () => {
  try {
    const banners: any[] = [];
    const files = fs.readdirSync(BANNERS_DIR);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(BANNERS_DIR, file);
        const data = fs.readFileSync(filePath, 'utf8');
        banners.push(JSON.parse(data));
      }
    });

    return banners;
  } catch (error) {
    console.error('Error reading banners:', error);
    return [];
  }
};

export const deleteBanner = (bannerId: string) => {
  try {
    const filePath = path.join(BANNERS_DIR, `${bannerId}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Also delete from Supabase
    supabase.from('banners')
      .delete()
      .eq('id', bannerId)
      .then(({ error }) => {
        if (error) console.error('Error deleting from Supabase:', error);
      });
  } catch (error) {
    console.error('Error deleting banner:', error);
    throw error;
  }
};

// Store Settings
export const saveStoreSettings = (settings: any) => {
  try {
    const filePath = path.join(STORE_CONFIG_DIR, 'settings.json');
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));
    
    // Also save to Supabase as backup
    supabase.from('store_settings')
      .upsert({ ...settings, file_path: filePath })
      .then(({ error }) => {
        if (error) console.error('Error saving to Supabase:', error);
      });

    return settings;
  } catch (error) {
    console.error('Error saving store settings:', error);
    throw error;
  }
};

export const getStoreSettings = () => {
  try {
    const filePath = path.join(STORE_CONFIG_DIR, 'settings.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error reading store settings:', error);
    return null;
  }
};

// Stats
export const saveStats = (stats: any) => {
  try {
    const filePath = path.join(STORE_CONFIG_DIR, 'stats.json');
    fs.writeFileSync(filePath, JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.error('Error saving stats:', error);
    throw error;
  }
};

export const getStats = () => {
  try {
    const filePath = path.join(STORE_CONFIG_DIR, 'stats.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error reading stats:', error);
    return null;
  }
};

// Migration utility
export const migrateFromLocalStorage = () => {
  try {
    // Migrate products
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.forEach((product: Product) => saveProduct(product));

    // Migrate orders
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.forEach((order: any) => saveOrder(order));

    // Migrate banners
    const banners = JSON.parse(localStorage.getItem('banners') || '[]');
    banners.forEach((banner: any) => saveBanner(banner));

    // Migrate store settings
    const settings = JSON.parse(localStorage.getItem('store_settings') || '{}');
    if (Object.keys(settings).length > 0) {
      saveStoreSettings(settings);
    }

    // Migrate stats
    const stats = JSON.parse(localStorage.getItem('stats') || '{}');
    if (Object.keys(stats).length > 0) {
      saveStats(stats);
    }

    toast.success('Dados migrados com sucesso para armazenamento local!');
  } catch (error) {
    console.error('Error during migration:', error);
    toast.error('Erro durante a migração dos dados');
  }
};