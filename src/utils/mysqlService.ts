import axios from 'axios';
import { Product, Banner, Order, UserData, StoreConfig } from '@/types/storage';

class MysqlService {
  private baseUrl = '/api';

  async getStoreSettings(): Promise<StoreConfig> {
    const response = await axios.get(`${this.baseUrl}/store-config/read.php`);
    return response.data;
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

  async deleteBanner(id: string): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/banners/delete.php`, { id });
    return response.data;
  }

  async savePixConfig(config: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/pix-config/update.php`, config);
    return response.data;
  }

  async getUsers(): Promise<UserData[]> {
    const response = await axios.get(`${this.baseUrl}/users/read.php`);
    return response.data;
  }

  async saveUser(user: UserData): Promise<any> {
    if (user.id) {
      const response = await axios.post(`${this.baseUrl}/users/update.php`, user);
      return response.data;
    } else {
      const response = await axios.post(`${this.baseUrl}/users/create.php`, user);
      return response.data;
    }
  }

  async deleteUser(id: string): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/users/delete.php`, { id });
    return response.data;
  }
}

export const mysqlService = new MysqlService();