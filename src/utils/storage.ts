import { mysqlService } from './mysqlService';
import { Product, Order, StoreConfig } from '@/types/storage';

export interface UserData {
  id: string;
  email: string;
  role: string;
  created_at?: string;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export interface TictoConfig {
  apiKey: string;
}

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
      case 'users':
        const users = await mysqlService.getUsers();
        return users as T;
      case 'telegram_config':
        const telegramConfig = await mysqlService.getTelegramConfig();
        return telegramConfig as T;
      case 'ticto_config':
        const tictoConfig = await mysqlService.getTictoConfig();
        return tictoConfig as T;
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
      case 'users':
        if (Array.isArray(value)) {
          for (const user of value) {
            await mysqlService.saveUser(user);
          }
        }
        break;
      case 'telegram_config':
        await mysqlService.saveTelegramConfig(value);
        break;
      case 'ticto_config':
        await mysqlService.saveTictoConfig(value);
        break;
    }
    return true;
  } catch (error) {
    console.error('Error saving data to storage:', error);
    return false;
  }
};