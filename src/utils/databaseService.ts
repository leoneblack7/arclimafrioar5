import { Product } from "@/types/product";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';

// Products
export const saveProduct = async (product: Product) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .upsert(product)
      .select()
      .single();

    if (error) throw error;

    // Update local storage as backup
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
    return saveProductToLocalStorage(product);
  }
};

const saveProductToLocalStorage = (product: Product) => {
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
};

export const getProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    saveToLocalStorage('products', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return getFromLocalStorage('products', []);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw error;

    // Update local storage
    const products = getFromLocalStorage('products', []);
    const filteredProducts = products.filter((p: Product) => p.id !== productId);
    saveToLocalStorage('products', filteredProducts);
  } catch (error) {
    console.error('Error deleting product:', error);
    // Still update local storage even if Supabase fails
    const products = getFromLocalStorage('products', []);
    const filteredProducts = products.filter((p: Product) => p.id !== productId);
    saveToLocalStorage('products', filteredProducts);
  }
};

// Orders
export const saveOrder = async (order: any) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .upsert(order)
      .select()
      .single();

    if (error) throw error;

    // Update local storage as backup
    const orders = getFromLocalStorage('orders', []);
    const index = orders.findIndex((o: any) => o.id === order.id);
    if (index !== -1) {
      orders[index] = data;
    } else {
      orders.push(data);
    }
    saveToLocalStorage('orders', orders);

    return data;
  } catch (error) {
    console.error('Error saving order:', error);
    return saveOrderToLocalStorage(order);
  }
};

const saveOrderToLocalStorage = (order: any) => {
  const orders = getFromLocalStorage('orders', []);
  const newOrder = { 
    ...order, 
    id: order.id || crypto.randomUUID()
  };
  
  if (order.id) {
    const index = orders.findIndex((o: any) => o.id === order.id);
    if (index !== -1) orders[index] = newOrder;
  } else {
    orders.push(newOrder);
  }
  
  saveToLocalStorage('orders', orders);
  return newOrder;
};

export const getOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `);

    if (error) throw error;
    
    saveToLocalStorage('orders', data);
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return getFromLocalStorage('orders', []);
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) throw error;

    // Update local storage
    const orders = getFromLocalStorage('orders', []);
    const filteredOrders = orders.filter((o: any) => o.id !== orderId);
    saveToLocalStorage('orders', filteredOrders);
  } catch (error) {
    console.error('Error deleting order:', error);
    // Still update local storage even if Supabase fails
    const orders = getFromLocalStorage('orders', []);
    const filteredOrders = orders.filter((o: any) => o.id !== orderId);
    saveToLocalStorage('orders', filteredOrders);
  }
};

// Migration utility
export const migrateFromLocalStorage = async () => {
  try {
    // Migrate products
    const products = getFromLocalStorage('products', []);
    for (const product of products) {
      await saveProduct(product);
    }

    // Migrate orders
    const orders = getFromLocalStorage('orders', []);
    for (const order of orders) {
      await saveOrder(order);
    }

    toast.success('Dados migrados com sucesso para o Supabase!');
  } catch (error) {
    console.error('Error during migration:', error);
    toast.error('Erro durante a migração dos dados');
  }
};