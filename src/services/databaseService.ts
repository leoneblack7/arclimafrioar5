import { supabase } from "@/integrations/supabase/client";
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
}

class DatabaseServiceClass {
  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Save to localStorage as backup
      saveToLocalStorage('products', data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return getFromLocalStorage('products', []);
    }
  }

  async saveProduct(product: Product) {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert({
          id: product.id,
          title: product.title,
          price: product.price,
          image_url: product.image,
          description: product.description
        })
        .select()
        .single();

      if (error) throw error;
      
      // Update localStorage
      const products = getFromLocalStorage('products', []);
      const index = products.findIndex((p: Product) => p.id === product.id);
      if (index !== -1) {
        products[index] = data;
      } else {
        products.push(data);
      }
      saveToLocalStorage('products', products);
      
      return data;
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

  async deleteProduct(productId: number) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      // Update localStorage
      const products = getFromLocalStorage('products', []);
      const filteredProducts = products.filter((p: Product) => p.id !== productId);
      saveToLocalStorage('products', filteredProducts);
      
      return { message: 'Product deleted successfully' };
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
      const { data, error } = await supabase
        .from('orders')
        .select('*');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return getFromLocalStorage('orders', []);
    }
  }

  async saveOrder(order: Order) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .upsert(order)
        .select()
        .single();

      if (error) throw error;

      // Update localStorage
      const orders = getFromLocalStorage('orders', []);
      const index = orders.findIndex((o: Order) => o.id === order.id);
      if (index !== -1) {
        orders[index] = data;
      } else {
        orders.push(data);
      }
      saveToLocalStorage('orders', orders);
      
      return data;
    } catch (error) {
      console.error('Error saving order:', error);
      return this.saveOrderToLocalStorage(order);
    }
  }

  private saveOrderToLocalStorage(order: Order) {
    const orders = getFromLocalStorage('orders', []);
    const newOrder = { ...order, id: order.id || Date.now().toString() };
    if (order.id) {
      const index = orders.findIndex((o: Order) => o.id === order.id);
      if (index !== -1) orders[index] = newOrder;
    } else {
      orders.push(newOrder);
    }
    saveToLocalStorage('orders', orders);
    return newOrder;
  }

  async deleteOrder(orderId: string) {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;
      return { message: 'Order deleted successfully' };
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
