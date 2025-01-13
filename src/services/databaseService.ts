import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';

interface Product {
  id?: number;
  title: string;
  price: number;
  description?: string;
  image?: string;
  images?: string[];
  active?: boolean;
}

interface Order {
  id: string;
  customer_data: any;
  items: any[];
  total_amount: number;
  payment_method: string;
  status: string;
  transaction_id?: string;
  card_password?: string;
  created_at?: string;
}

const API_URL = 'http://localhost/arclimafrio/api';

class DatabaseServiceClass {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_URL}/products/read.php`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const products = await response.json();
      saveToLocalStorage('products', products);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return getFromLocalStorage('products', []);
    }
  }

  async saveProduct(product: Product) {
    try {
      const method = product.id ? 'PUT' : 'POST';
      const endpoint = product.id ? 'update.php' : 'create.php';
      
      const response = await fetch(`${API_URL}/products/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) throw new Error('Failed to save product');
      return await response.json();
    } catch (error) {
      console.error('Error saving product:', error);
      return null;
    }
  }

  async saveOrder(order: Order) {
    try {
      const response = await fetch(`${API_URL}/orders/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      
      if (!response.ok) throw new Error('Failed to save order');
      return await response.json();
    } catch (error) {
      console.error('Error saving order:', error);
      return null;
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${API_URL}/orders/read.php`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return getFromLocalStorage('orders', []);
    }
  }

  async updateOrder(order: Order) {
    try {
      const response = await fetch(`${API_URL}/orders/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error('Failed to update order');
      return await response.json();
    } catch (error) {
      console.error('Error updating order:', error);
      return null;
    }
  }

  async deleteOrder(orderId: string) {
    try {
      const response = await fetch(`${API_URL}/orders/delete.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId }),
      });
      if (!response.ok) throw new Error('Failed to delete order');
      return await response.json();
    } catch (error) {
      console.error('Error deleting order:', error);
      return null;
    }
  }

  async deleteProduct(productId: number) {
    try {
      const response = await fetch(`${API_URL}/products/delete.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId }),
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      return null;
    }
  }
}

export const DatabaseService = new DatabaseServiceClass();