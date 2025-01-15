import { supabase } from "@/integrations/supabase/client";
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';
import { Product, Order, OrderItem } from '@/types/product';

class DatabaseServiceClass {
  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      saveToLocalStorage('products', data);
      return data as Product[];
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
          image_url: product.image_url,
          description: product.description
        })
        .select()
        .single();

      if (error) throw error;
      
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
    const newProduct = { 
      ...product, 
      id: product.id || crypto.randomUUID()
    };
    if (product.id) {
      const index = products.findIndex((p: Product) => p.id === product.id);
      if (index !== -1) products[index] = newProduct;
    } else {
      products.push(newProduct);
    }
    saveToLocalStorage('products', products);
    return newProduct;
  }

  async deleteProduct(productId: string) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

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
        .select(`
          *,
          order_items (*)
        `);

      if (error) throw error;

      const transformedOrders = data.map(order => ({
        ...order,
        items: order.order_items || [],
        customer_data: order.customer_data || {},
        payment_method: order.payment_method || 'unknown'
      })) as Order[];

      return transformedOrders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return getFromLocalStorage('orders', []);
    }
  }

  async saveOrder(order: Order) {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .upsert({
          id: order.id,
          user_id: order.user_id,
          status: order.status,
          total_amount: order.total_amount,
          customer_data: order.customer_data,
          payment_method: order.payment_method
        })
        .select()
        .single();

      if (orderError) throw orderError;

      if (order.items && order.items.length > 0) {
        const { error: itemsError } = await supabase
          .from('order_items')
          .upsert(
            order.items.map(item => ({
              order_id: orderData.id,
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.price
            }))
          );

        if (itemsError) throw itemsError;
      }

      return orderData;
    } catch (error) {
      console.error('Error saving order:', error);
      return this.saveOrderToLocalStorage(order);
    }
  }

  private saveOrderToLocalStorage(order: Order) {
    const orders = getFromLocalStorage('orders', []);
    const newOrder = { 
      ...order, 
      id: order.id || crypto.randomUUID()
    };
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
      await supabase
        .from('order_items')
        .delete()
        .eq('order_id', orderId);

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