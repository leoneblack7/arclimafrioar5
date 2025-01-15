import { getFromLocalStorage, saveToLocalStorage } from './localStorage';
import { Product, Order } from '@/types/product';

// Products
export const saveProduct = (product: Product) => {
  const products = getFromLocalStorage('products', []);
  const existingIndex = products.findIndex((p: Product) => p.id === product.id);
  
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }
  
  saveToLocalStorage('products', products);
};

export const getProducts = (): Product[] => {
  return getFromLocalStorage('products', []);
};

export const deleteProduct = (productId: string) => {
  const products = getFromLocalStorage('products', []);
  const updatedProducts = products.filter((p: Product) => p.id !== productId);
  saveToLocalStorage('products', updatedProducts);
};

// Orders
export const saveOrder = (order: Order) => {
  const orders = getFromLocalStorage('orders', []);
  const existingIndex = orders.findIndex((o: Order) => o.id === order.id);
  
  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.push(order);
  }
  
  saveToLocalStorage('orders', orders);
};

export const getOrders = (): Order[] => {
  return getFromLocalStorage('orders', []);
};

export const deleteOrder = (orderId: string) => {
  const orders = getFromLocalStorage('orders', []);
  const updatedOrders = orders.filter((o: Order) => o.id !== orderId);
  saveToLocalStorage('orders', updatedOrders);
};