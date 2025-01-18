import { toast } from "sonner";
import { Product } from "@/types/product";

const API_BASE_URL = 'http://localhost/api';

export const mysqlService = {
  // Product operations
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/read.php`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Erro ao carregar produtos");
      return [];
    }
  },

  async saveProduct(product: Product) {
    try {
      const url = product.id 
        ? `${API_BASE_URL}/products/update.php`
        : `${API_BASE_URL}/products/create.php`;
      
      const response = await fetch(url, {
        method: product.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      
      if (!response.ok) throw new Error('Failed to save product');
      return await response.json();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error("Erro ao salvar produto");
      throw error;
    }
  },

  async deleteProduct(productId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/delete.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId })
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Erro ao deletar produto");
      throw error;
    }
  },

  // Order operations
  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/read.php`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error("Erro ao carregar pedidos");
      return [];
    }
  },

  async saveOrder(order: any) {
    try {
      const url = order.id 
        ? `${API_BASE_URL}/orders/update.php`
        : `${API_BASE_URL}/orders/create.php`;
      
      const response = await fetch(url, {
        method: order.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      
      if (!response.ok) throw new Error('Failed to save order');
      return await response.json();
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error("Erro ao salvar pedido");
      throw error;
    }
  },

  async deleteOrder(orderId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/delete.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId })
      });
      
      if (!response.ok) throw new Error('Failed to delete order');
      return await response.json();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error("Erro ao deletar pedido");
      throw error;
    }
  },

  // Store settings operations
  async getStoreSettings() {
    try {
      const response = await fetch(`${API_BASE_URL}/store-config/get-cart.php`);
      if (!response.ok) throw new Error('Failed to fetch store settings');
      return await response.json();
    } catch (error) {
      console.error('Error fetching store settings:', error);
      toast.error("Erro ao carregar configurações da loja");
      return null;
    }
  },

  async saveStoreSettings(settings: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/store-config/save-cart.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (!response.ok) throw new Error('Failed to save store settings');
      return await response.json();
    } catch (error) {
      console.error('Error saving store settings:', error);
      toast.error("Erro ao salvar configurações da loja");
      throw error;
    }
  }
};