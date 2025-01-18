import { mysqlService } from './mysqlService';
import { Product, Order, StoreConfig } from '@/types/storage';

export const getFromStorage = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    switch (key) {
      case 'products':
        const products = await mysqlService.getProducts();
        return products as T;
      case 'orders':
        const orders = await mysqlService.getOrders();
        return orders as T;
      case 'store_config':
        const config = await mysqlService.getStoreSettings();
        return config as T;
      default:
        return defaultValue;
    }
  } catch (error) {
    console.error('Error getting data from storage:', error);
    return defaultValue;
  }
};

export const saveToStorage = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    switch (key) {
      case 'products':
        if (Array.isArray(value)) {
          for (const product of value) {
            await mysqlService.saveProduct(product);
          }
        }
        break;
      case 'orders':
        if (Array.isArray(value)) {
          for (const order of value) {
            await mysqlService.saveOrder(order);
          }
        }
        break;
      case 'store_config':
        await mysqlService.saveStoreSettings(value);
        break;
    }
    return true;
  } catch (error) {
    console.error('Error saving data to storage:', error);
    return false;
  }
};

// Temporary compatibility functions
export const getFromLocalStorage = async <T>(key: string, defaultValue: T): Promise<T> => {
  return getFromStorage(key, defaultValue);
};

export const saveToLocalStorage = async <T>(key: string, value: T): Promise<boolean> => {
  return saveToStorage(key, value);
};