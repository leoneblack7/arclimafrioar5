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
      const response = await fetch(`${API_URL}/products/create.php`, {
        method: 'POST',
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
      const newProduct = { ...product, id: Date.now() };
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
      return newProduct;
    }
  },

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
      return response.json();
    } catch (error) {
      console.error('Error saving order:', error);
      // Fallback to localStorage if API is not available
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      return order;
    }
  }
};