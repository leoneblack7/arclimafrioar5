import { mysqlService } from './mysqlService';

export const migrateLocalStorageToMySQL = async () => {
  // Migrate products
  const products = await mysqlService.getProducts();
  if (products.length === 0) {
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
    for (const product of localProducts) {
      await mysqlService.saveProduct(product);
    }
  }

  // Migrate orders
  const orders = await mysqlService.getOrders();
  if (orders.length === 0) {
    const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    for (const order of localOrders) {
      await mysqlService.saveOrder(order);
    }
  }

  // Migrate store settings
  const settings = await mysqlService.getStoreSettings();
  if (!settings.store_name) {
    const localSettings = {
      store_name: localStorage.getItem('store_name') || 'ArclimaFrio',
      logo_url: localStorage.getItem('logo_url') || '',
    };
    await mysqlService.saveStoreSettings(localSettings);
  }

  // Clear localStorage after migration
  localStorage.clear();
};