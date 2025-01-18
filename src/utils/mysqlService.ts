import axios from 'axios';

const API_URL = 'http://localhost/api';

export const mysqlService = {
  async getStoreSettings() {
    const response = await axios.get(`${API_URL}/store-config/read.php`);
    return response.data;
  },

  async saveStoreSettings(settings: any) {
    const response = await axios.post(`${API_URL}/store-config/update.php`, settings);
    return response.data;
  },

  async getProducts() {
    const response = await axios.get(`${API_URL}/products/read.php`);
    return response.data;
  },

  async saveProduct(product: any) {
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

  async saveUser(user: any) {
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