import axios from 'axios';
import { Product } from '@/types/product';
import { UserData } from '@/types/storage';

const API_URL = '/api';

interface TelegramConfig {
  botToken: string;
  chatId: string;
}

interface TictoConfig {
  apiKey: string;
}

export const mysqlService = {
  async getStoreSettings() {
    try {
      const response = await axios.get(`${API_URL}/store-config/read.php`);
      return response.data;
    } catch (error) {
      console.error('Error fetching store settings:', error);
      // Return default values if the request fails
      return {
        logo_url: '',
        store_name: 'ArclimaFrio'
      };
    }
  },

  async saveStoreSettings(settings: any) {
    const response = await axios.post(`${API_URL}/store-config/update.php`, settings);
    return response.data;
  },

  async getProducts() {
    const response = await axios.get(`${API_URL}/products/read.php`);
    return response.data;
  },

  async saveProduct(product: Product) {
    if (product.id) {
      const response = await axios.post(`${API_URL}/products/update.php`, product);
      return response.data;
    } else {
      const response = await axios.post(`${API_URL}/products/create.php`, product);
      return response.data;
    }
  },

  async deleteProduct(id: string) {
    const response = await axios.post(`${API_URL}/products/delete.php`, { id });
    return response.data;
  },

  async getOrders() {
    const response = await axios.get(`${API_URL}/orders/read.php`);
    return response.data;
  },

  async saveOrder(order: any) {
    if (order.id) {
      const response = await axios.post(`${API_URL}/orders/update.php`, order);
      return response.data;
    } else {
      const response = await axios.post(`${API_URL}/orders/create.php`, order);
      return response.data;
    }
  },

  async deleteOrder(id: string) {
    const response = await axios.post(`${API_URL}/orders/delete.php`, { id });
    return response.data;
  },

  async getUsers() {
    const response = await axios.get(`${API_URL}/users/read.php`);
    return response.data;
  },

  async saveUser(user: UserData) {
    if (user.id) {
      const response = await axios.post(`${API_URL}/users/update.php`, user);
      return response.data;
    } else {
      const response = await axios.post(`${API_URL}/users/create.php`, user);
      return response.data;
    }
  },

  async deleteUser(id: string) {
    const response = await axios.post(`${API_URL}/users/delete.php`, { id });
    return response.data;
  },

  async getTelegramConfig(): Promise<TelegramConfig> {
    const response = await axios.get(`${API_URL}/store-config/get-telegram.php`);
    return response.data;
  },

  async saveTelegramConfig(config: TelegramConfig) {
    const response = await axios.post(`${API_URL}/store-config/save-telegram.php`, config);
    return response.data;
  },

  async getTictoConfig(): Promise<TictoConfig> {
    const response = await axios.get(`${API_URL}/store-config/get-ticto.php`);
    return response.data;
  },

  async saveTictoConfig(config: TictoConfig) {
    const response = await axios.post(`${API_URL}/store-config/save-ticto.php`, config);
    return response.data;
  }
};

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
        await mysqlService.saveTelegramConfig(value as TelegramConfig);
        break;
      case 'ticto_config':
        await mysqlService.saveTictoConfig(value as TictoConfig);
        break;
    }
    return true;
  } catch (error) {
    console.error('Error saving data to storage:', error);
    return false;
  }
};
