import {
  getProducts,
  saveProduct,
  deleteProduct,
  getOrders,
  saveOrder,
  deleteOrder,
  getStoreConfig,
  saveStoreConfig,
  getBanners,
  saveBanner,
  deleteBanner,
  getFeaturedProducts,
  saveFeaturedProduct,
  deleteFeaturedProduct,
  getCart,
  saveCart
} from './localFileStorage';

// Products
export const getProductsFromDb = async () => getProducts();
export const saveProductToDb = async (product: any) => saveProduct(product);
export const deleteProductFromDb = async (id: string) => deleteProduct(id);

// Orders
export const getOrdersFromDb = async () => getOrders();
export const saveOrderToDb = async (order: any) => saveOrder(order);
export const deleteOrderFromDb = async (id: string) => deleteOrder(id);

// Store Settings
export const getStoreSettings = async () => getStoreConfig();
export const saveStoreSettings = async (settings: any) => saveStoreConfig(settings);

// Banners
export const getBannersFromDb = async () => getBanners();
export const saveBannerToDb = async (banner: any) => saveBanner(banner);
export const deleteBannerFromDb = async (id: string) => deleteBanner(id);

// Featured Products
export const getFeaturedProductsFromDb = async () => getFeaturedProducts();
export const saveFeaturedProductToDb = async (product: any) => saveFeaturedProduct(product);
export const deleteFeaturedProductFromDb = async (id: string) => deleteFeaturedProduct(id);

// Cart
export const getCartFromDb = async () => getCart();
export const saveCartToDb = async (cartData: any) => saveCart(cartData);