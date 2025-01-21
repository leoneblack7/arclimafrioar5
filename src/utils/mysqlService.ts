import axios from 'axios';
import { Product, Banner, Order, UserData, StoreConfig, TelegramConfig, TictoConfig } from '@/types/storage';

class MysqlService {
  private baseUrl = '/api';

  async getStoreSettings(): Promise<StoreConfig> {
    try {
      const response = await axios.get(`${this.baseUrl}/store-config/read.php`);
      return response.data;
    } catch (error) {
      console.error('Error fetching store settings:', error);
      // Return default values if the request fails
      return {
        logo_url: '',
        store_name: 'ArclimaFrio'
      };
    }
  }

  async saveStoreSettings(settings: StoreConfig): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/store-config/update.php`, settings);
    return response.data;
  }

  async getProducts(): Promise<Product[]> {
    const response = await axios.get(`${this.baseUrl}/products/read.php`);
    return response.data;
  }

  async saveProduct(product: Product): Promise<any> {
    if (product.id) {
      const response = await axios.post(`${this.baseUrl}/products/update.php`, product);
      return response.data;
    } else {
      const response = await axios.post(`${this.baseUrl}/products/create.php`, product);
      return response.data;
    }
  }

  async deleteProduct(id: string): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/products/delete.php`, { id });
    return response.data;
  }

  async getBanners(): Promise<Banner[]> {
    const response = await axios.get(`${this.baseUrl}/banners/read.php`);
    return response.data;
  }

  async saveBanners(banners: Banner[]): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/banners/update.php`, { banners });
    return response.data;
  }

  async saveBanner(banner: Banner): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/banners/update.php`, { banner });
    return response.data;
  }

  async deleteBanner(id: string): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/banners/delete.php`, { id });
    return response.data;
  }

  async getOrders(): Promise<Order[]> {
    const response = await axios.get(`${this.baseUrl}/orders/read.php`);
    return response.data;
  }

  async saveOrder(order: Order): Promise<any> {
    if (order.id) {
      const response = await axios.post(`${this.baseUrl}/orders/update.php`, order);
      return response.data;
    } else {
      const response = await axios.post(`${this.baseUrl}/orders/create.php`, order);
      return response.data;
    }
  }

  async deleteOrder(id: string): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/orders/delete.php`, { id });
    return response.data;
  }

  async getTelegramConfig(): Promise<TelegramConfig> {
    const response = await axios.get(`${this.baseUrl}/store-config/get-telegram.php`);
    return response.data;
  }

  async saveTelegramConfig(config: TelegramConfig): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/store-config/save-telegram.php`, config);
    return response.data;
  }

  async getTictoConfig(): Promise<TictoConfig> {
    const response = await axios.get(`${this.baseUrl}/store-config/get-ticto.php`);
    return response.data;
  }

  async saveTictoConfig(config: TictoConfig): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/store-config/save-ticto.php`, config);
    return response.data;
  }

  async savePixConfig(config: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/pix-config/update.php`, config);
    return response.data;
  }

  async saveUser(userData: Partial<UserData>): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/users/update.php`, userData);
    return response.data;
  }

  async saveTheme(theme: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/themes/update.php`, theme);
    return response.data;
  }

  async getActiveTheme(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/themes/get-active.php`);
    return response.data;
  }
}

export const mysqlService = new MysqlService();
