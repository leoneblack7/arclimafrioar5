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
  tracking_updates?: any[];
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
      
      // Save to localStorage as backup
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) throw new Error('Failed to save product');
      const savedProduct = await response.json();
      
      // Update localStorage
      const products = getFromLocalStorage('products', []);
      const index = products.findIndex((p: Product) => p.id === product.id);
      if (index !== -1) {
        products[index] = savedProduct;
      } else {
        products.push(savedProduct);
      }
      saveToLocalStorage('products', products);
      
      return savedProduct;
    } catch (error) {
      console.error('Error saving product:', error);
      return this.saveProductToLocalStorage(product);
    }
  }

  private saveProductToLocalStorage(product: Product) {
    const products = getFromLocalStorage('products', []);
    const newProduct = { ...product, id: product.id || Date.now() };
    if (product.id) {
      const index = products.findIndex((p: Product) => p.id === product.id);
      if (index !== -1) products[index] = newProduct;
    } else {
      products.push(newProduct);
    }
    saveToLocalStorage('products', products);
    return newProduct;
  }

  async saveOrder(order: Order) {
    try {
      const response = await fetch(`${API_URL}/orders/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      
      if (!response.ok) throw new Error('Failed to save order');
      const savedOrder = await response.json();
      
      // Update localStorage
      const orders = getFromLocalStorage('orders', []);
      const index = orders.findIndex((o: Order) => o.id === order.id);
      if (index !== -1) {
        orders[index] = savedOrder;
      } else {
        orders.push(savedOrder);
      }
      saveToLocalStorage('orders', orders);
      
      return savedOrder;
    } catch (error) {
      console.error('Error saving order:', error);
      return this.saveOrderToLocalStorage(order);
    }
  }

  private saveOrderToLocalStorage(order: Order) {
    const orders = getFromLocalStorage('orders', []);
    const index = orders.findIndex((o: Order) => o.id === order.id);
    if (index !== -1) {
      orders[index] = order;
    } else {
      orders.push(order);
    }
    saveToLocalStorage('orders', orders);
    return order;
  }

  async deleteProduct(productId: number) {
    try {
      const response = await fetch(`${API_URL}/products/delete.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      const products = getFromLocalStorage('products', []);
      const filteredProducts = products.filter((p: Product) => p.id !== productId);
      saveToLocalStorage('products', filteredProducts);
      return { message: 'Product deleted successfully' };
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${API_URL}/orders/read.php`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return getFromLocalStorage('orders', []);
    }
  }

  async updateOrder(order: Order) {
    try {
      const response = await fetch(`${API_URL}/orders/update.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error('Failed to update order');
      return response.json();
    } catch (error) {
      console.error('Error updating order:', error);
      const orders = getFromLocalStorage('orders', []);
      const index = orders.findIndex((o: Order) => o.id === order.id);
      if (index !== -1) orders[index] = order;
      saveToLocalStorage('orders', orders);
      return order;
    }
  }

  async deleteOrder(orderId: string) {
    try {
      const response = await fetch(`${API_URL}/orders/delete.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId }),
      });
      if (!response.ok) throw new Error('Failed to delete order');
      return response.json();
    } catch (error) {
      console.error('Error deleting order:', error);
      const orders = getFromLocalStorage('orders', []);
      const filteredOrders = orders.filter((o: Order) => o.id !== orderId);
      saveToLocalStorage('orders', filteredOrders);
      return { message: 'Order deleted successfully' };
    }
  }
}

export const DatabaseService = new DatabaseServiceClass();
