import { supabase } from "@/integrations/supabase/client";
import { Product, Order } from "@/types/product";
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';

// Store Settings
export const saveStoreSettings = async (settings: { logo_url: string, store_name: string }) => {
  try {
    const { data, error } = await supabase
      .from('store_settings')
      .upsert({ logo_url: settings.logo_url })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving store settings:', error);
    return null;
  }
};

export const getStoreSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching store settings:', error);
    return null;
  }
};

// Banners
export const saveBanner = async (banner: { id: string; image_url: string; active: boolean }) => {
  try {
    const { data, error } = await supabase
      .from('banners')
      .upsert(banner)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving banner:', error);
    return null;
  }
};

export const getBanners = async () => {
  try {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
};

export const deleteBanner = async (bannerId: string) => {
  try {
    const { error } = await supabase
      .from('banners')
      .delete()
      .eq('id', bannerId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting banner:', error);
    return false;
  }
};

// Products
export const saveProduct = async (product: Product) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .upsert(product)
      .select()
      .single();

    if (error) throw error;
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
    return data || [];
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
    
    const products = getFromLocalStorage('products', []);
    const filteredProducts = products.filter((p: Product) => p.id !== productId);
    saveToLocalStorage('products', filteredProducts);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// Orders
export const getOrders = async () => {
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
      customer_data: parseCustomerData(order.customer_data),
      payment_method: order.payment_method || 'unknown'
    }));

    return transformedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return getFromLocalStorage('orders', []);
  }
};

const parseCustomerData = (customerData: any) => {
  if (!customerData) {
    return {
      name: '',
      email: '',
    };
  }

  if (typeof customerData === 'string') {
    try {
      customerData = JSON.parse(customerData);
    } catch (e) {
      console.error('Error parsing customer data:', e);
      return { name: '', email: '' };
    }
  }

  return {
    name: customerData.name || '',
    email: customerData.email || '',
    phone: customerData.phone || '',
    address: customerData.address || '',
    city: customerData.city || '',
    state: customerData.state || '',
    zipCode: customerData.zipCode || '',
  };
};

export const saveOrder = async (order: Order) => {
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
    return saveOrderToLocalStorage(order);
  }
};

const saveOrderToLocalStorage = (order: Order) => {
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
};

export const deleteOrder = async (orderId: string) => {
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
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    const orders = getFromLocalStorage('orders', []);
    const filteredOrders = orders.filter((o: Order) => o.id !== orderId);
    saveToLocalStorage('orders', filteredOrders);
    return false;
  }
};