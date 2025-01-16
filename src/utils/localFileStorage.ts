import fs from 'fs';
import path from 'path';

const DATA_DIR = 'data';
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const STORE_CONFIG_FILE = path.join(DATA_DIR, 'store-config.json');
const BANNERS_FILE = path.join(DATA_DIR, 'banners.json');
const FEATURED_PRODUCTS_FILE = path.join(DATA_DIR, 'featured-products.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
const initializeFile = (filePath: string, defaultData: any = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

initializeFile(ORDERS_FILE);
initializeFile(PRODUCTS_FILE);
initializeFile(STORE_CONFIG_FILE, {});
initializeFile(BANNERS_FILE);
initializeFile(FEATURED_PRODUCTS_FILE);

export const readData = (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

export const writeData = (filePath: string, data: any) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
};

// Products
export const getProducts = () => readData(PRODUCTS_FILE) || [];
export const saveProduct = (product: any) => {
  const products = getProducts();
  const index = products.findIndex((p: any) => p.id === product.id);
  
  if (index >= 0) {
    products[index] = { ...products[index], ...product };
  } else {
    products.push({ ...product, id: crypto.randomUUID() });
  }
  
  return writeData(PRODUCTS_FILE, products);
};
export const deleteProduct = (id: string) => {
  const products = getProducts();
  const filtered = products.filter((p: any) => p.id !== id);
  return writeData(PRODUCTS_FILE, filtered);
};

// Orders
export const getOrders = () => readData(ORDERS_FILE) || [];
export const saveOrder = (order: any) => {
  const orders = getOrders();
  const index = orders.findIndex((o: any) => o.id === order.id);
  
  if (index >= 0) {
    orders[index] = { ...orders[index], ...order };
  } else {
    orders.push({ ...order, id: crypto.randomUUID() });
  }
  
  return writeData(ORDERS_FILE, orders);
};
export const deleteOrder = (id: string) => {
  const orders = getOrders();
  const filtered = orders.filter((o: any) => o.id !== id);
  return writeData(ORDERS_FILE, filtered);
};

// Store Config
export const getStoreConfig = () => readData(STORE_CONFIG_FILE) || {};
export const saveStoreConfig = (config: any) => writeData(STORE_CONFIG_FILE, config);

// Banners
export const getBanners = () => readData(BANNERS_FILE) || [];
export const saveBanner = (banner: any) => {
  const banners = getBanners();
  const index = banners.findIndex((b: any) => b.id === banner.id);
  
  if (index >= 0) {
    banners[index] = { ...banners[index], ...banner };
  } else {
    banners.push({ ...banner, id: crypto.randomUUID() });
  }
  
  return writeData(BANNERS_FILE, banners);
};
export const deleteBanner = (id: string) => {
  const banners = getBanners();
  const filtered = banners.filter((b: any) => b.id !== id);
  return writeData(BANNERS_FILE, filtered);
};

// Featured Products
export const getFeaturedProducts = () => readData(FEATURED_PRODUCTS_FILE) || [];
export const saveFeaturedProduct = (product: any) => {
  const products = getFeaturedProducts();
  const index = products.findIndex((p: any) => p.id === product.id);
  
  if (index >= 0) {
    products[index] = { ...products[index], ...product };
  } else {
    products.push({ ...product, id: crypto.randomUUID() });
  }
  
  return writeData(FEATURED_PRODUCTS_FILE, products);
};
export const deleteFeaturedProduct = (id: string) => {
  const products = getFeaturedProducts();
  const filtered = products.filter((p: any) => p.id !== id);
  return writeData(FEATURED_PRODUCTS_FILE, filtered);
};

// Cart
export const getCart = () => {
  const config = getStoreConfig();
  return config.cart_data || [];
};

export const saveCart = (cartData: any) => {
  const config = getStoreConfig();
  config.cart_data = cartData;
  return saveStoreConfig(config);
};