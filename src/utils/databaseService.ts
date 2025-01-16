import { Product, Order, Banner, StoreConfig } from "@/types/storage";
import { readData, writeData } from './localFileStorage';

// Products
export const getProducts = async (): Promise<Product[]> => {
  const products = await readData('products.json') || [];
  return products;
};

export const saveProduct = async (product: Product): Promise<boolean> => {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === product.id);
  
  if (index >= 0) {
    products[index] = { ...products[index], ...product };
  } else {
    products.push({ ...product, id: crypto.randomUUID() });
  }
  
  return writeData('products.json', products);
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const products = await getProducts();
  const filtered = products.filter(p => p.id !== id);
  return writeData('products.json', filtered);
};

// Orders
export const getOrders = async (): Promise<Order[]> => {
  const orders = await readData('orders.json') || [];
  return orders;
};

export const saveOrder = async (order: Order): Promise<boolean> => {
  const orders = await getOrders();
  const index = orders.findIndex(o => o.id === order.id);
  
  if (index >= 0) {
    orders[index] = { ...orders[index], ...order };
  } else {
    orders.push({ ...order, id: crypto.randomUUID() });
  }
  
  return writeData('orders.json', orders);
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  const orders = await getOrders();
  const filtered = orders.filter(o => o.id !== id);
  return writeData('orders.json', filtered);
};

// Banners
export const getBanners = async (): Promise<Banner[]> => {
  const banners = await readData('banners.json') || [];
  return banners;
};

export const saveBanner = async (banner: Banner): Promise<boolean> => {
  const banners = await getBanners();
  const index = banners.findIndex(b => b.id === banner.id);
  
  if (index >= 0) {
    banners[index] = { ...banners[index], ...banner };
  } else {
    banners.push({ ...banner, id: crypto.randomUUID() });
  }
  
  return writeData('banners.json', banners);
};

export const deleteBanner = async (id: string): Promise<boolean> => {
  const banners = await getBanners();
  const filtered = banners.filter(b => b.id !== id);
  return writeData('banners.json', filtered);
};

// Store Settings
export const getStoreSettings = async (): Promise<StoreConfig> => {
  const config = await readData('store-config.json') || {};
  return config;
};

export const saveStoreSettings = async (config: StoreConfig): Promise<boolean> => {
  return writeData('store-config.json', config);
};

// Cart
export const getCart = async () => {
  const config = await getStoreSettings();
  return config.cart_data || [];
};

export const saveCart = async (cartData: any): Promise<boolean> => {
  const config = await getStoreSettings();
  config.cart_data = cartData;
  return saveStoreSettings(config);
};