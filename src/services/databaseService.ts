import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

export const DatabaseService = {
  async saveOrder(order: any) {
    const orders = getFromLocalStorage('orders', []);
    orders.push(order);
    saveToLocalStorage('orders', orders);
    return { success: true };
  },

  async getOrders() {
    return getFromLocalStorage('orders', []);
  },

  async deleteOrder(orderId: string) {
    const orders = getFromLocalStorage('orders', []);
    const filteredOrders = orders.filter((order: any) => order.id !== orderId);
    saveToLocalStorage('orders', filteredOrders);
    return { success: true };
  },

  async updateOrder(orderId: string, updateData: any) {
    const orders = getFromLocalStorage('orders', []);
    const updatedOrders = orders.map((order: any) => 
      order.id === orderId ? { ...order, ...updateData } : order
    );
    saveToLocalStorage('orders', updatedOrders);
    return { success: true };
  },

  async saveProduct(product: any) {
    const products = getFromLocalStorage('products', []);
    products.push(product);
    saveToLocalStorage('products', products);
    return { success: true };
  },

  async getProducts() {
    return getFromLocalStorage('products', []);
  },

  async deleteProduct(productId: number) {
    const products = getFromLocalStorage('products', []);
    const filteredProducts = products.filter((product: any) => product.id !== productId);
    saveToLocalStorage('products', filteredProducts);
    return { success: true };
  },

  async updateProduct(productId: number, updateData: any) {
    const products = getFromLocalStorage('products', []);
    const updatedProducts = products.map((product: any) => 
      product.id === productId ? { ...product, ...updateData } : product
    );
    saveToLocalStorage('products', updatedProducts);
    return { success: true };
  }
};