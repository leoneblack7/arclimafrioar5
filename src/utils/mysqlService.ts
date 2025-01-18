import axios from 'axios';
import { Banner, Product, Order, UserData, StoreConfig } from '@/types/storage';

const API_URL = 'http://localhost/api';

export const mysqlService = {
  async getStoreSettings(): Promise<StoreConfig> {
    const response = await axios.get(`${API_URL}/store-config/read.php`);
    return response.data;
  },

  async saveStoreSettings(settings: StoreConfig) {
    const response = await axios.post(`${API_URL}/store-config/update.php`, settings);
    return response.data;
  },

  async getProducts(): Promise<Product[]> {
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

  async getBanners(): Promise<Banner[]> {
    const response = await axios.get(`${API_URL}/banners/read.php`);
    return response.data;
  },

  async saveBanner(banner: Banner) {
    if (banner.id) {
      const response = await axios.post(`${API_URL}/banners/update.php`, banner);
      return response.data;
    } else {
      const response = await axios.post(`${API_URL}/banners/create.php`, banner);
      return response.data;
    }
  },

  async saveBanners(banners: Banner[]) {
    const response = await axios.post(`${API_URL}/banners/update-all.php`, { banners });
    return response.data;
  },

  async deleteBanner(id: string) {
    const response = await axios.post(`${API_URL}/banners/delete.php`, { id });
    return response.data;
  },

  async getOrders(): Promise<Order[]> {
    const response = await axios.get(`${API_URL}/orders/read.php`);
    return response.data;
  },

  async saveOrder(order: Order) {
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

  async getUsers(): Promise<UserData[]> {
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
  }
};