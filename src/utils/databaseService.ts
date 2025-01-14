import { getFromLocalStorage, saveToLocalStorage } from './localStorage';

// Products
export const saveProduct = (product: any) => {
  const products = getFromLocalStorage('products', []);
  const existingIndex = products.findIndex((p: any) => p.id === product.id);
  
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }
  
  saveToLocalStorage('products', products);
};

export const getProducts = () => {
  return getFromLocalStorage('products', []);
};

export const deleteProduct = (productId: number) => {
  const products = getFromLocalStorage('products', []);
  const updatedProducts = products.filter((p: any) => p.id !== productId);
  saveToLocalStorage('products', updatedProducts);
};

// Orders
export const saveOrder = (order: any) => {
  const orders = getFromLocalStorage('orders', []);
  const existingIndex = orders.findIndex((o: any) => o.id === order.id);
  
  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.push(order);
  }
  
  saveToLocalStorage('orders', orders);
};

export const getOrders = () => {
  return getFromLocalStorage('orders', []);
};

export const deleteOrder = (orderId: string) => {
  const orders = getFromLocalStorage('orders', []);
  const updatedOrders = orders.filter((o: any) => o.id !== orderId);
  saveToLocalStorage('orders', updatedOrders);
};

// Store Configuration
export const saveStoreConfig = (config: any) => {
  saveToLocalStorage('store_config', config);
};

export const getStoreConfig = () => {
  return getFromLocalStorage('store_config', {});
};

// Cart
export const saveCart = (cartData: any) => {
  saveToLocalStorage('cart', cartData);
};

export const getCart = () => {
  return getFromLocalStorage('cart', []);
};