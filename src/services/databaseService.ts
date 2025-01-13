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
}

const API_URL = 'http://localhost/arclimafrio/api'; // Update this to match your XAMPP setup

export const DatabaseService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_URL}/products/read.php`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to localStorage if API is not available
      return JSON.parse(localStorage.getItem('products') || '[]');
    }
  },

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
      return response.json();
    } catch (error) {
      console.error('Error saving product:', error);
      // Fallback to localStorage if API is not available
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const newProduct = { ...product, id: product.id || Date.now() };
      if (product.id) {
        const index = products.findIndex((p: Product) => p.id === product.id);
        if (index !== -1) products[index] = newProduct;
      } else {
        products.push(newProduct);
      }
      localStorage.setItem('products', JSON.stringify(products));
      return newProduct;
    }
  },

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
      // Fallback to localStorage if API is not available
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const filteredProducts = products.filter((p: Product) => p.id !== productId);
      localStorage.setItem('products', JSON.stringify(filteredProducts));
      return { message: 'Product deleted successfully' };
    }
  },

  async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${API_URL}/orders/read.php`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback to localStorage if API is not available
      return JSON.parse(localStorage.getItem('orders') || '[]');
    }
  },

  async saveOrder(order: Order) {
    try {
      const method = 'POST';
      const response = await fetch(`${API_URL}/orders/create.php`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error('Failed to save order');
      return response.json();
    } catch (error) {
      console.error('Error saving order:', error);
      // Fallback to localStorage if API is not available
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      return order;
    }
  },

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
      // Fallback to localStorage if API is not available
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const index = orders.findIndex((o: Order) => o.id === order.id);
      if (index !== -1) orders[index] = order;
      localStorage.setItem('orders', JSON.stringify(orders));
      return order;
    }
  },

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
      // Fallback to localStorage if API is not available
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const filteredOrders = orders.filter((o: Order) => o.id !== orderId);
      localStorage.setItem('orders', JSON.stringify(filteredOrders));
      return { message: 'Order deleted successfully' };
    }
  }
};