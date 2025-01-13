import { Product } from '@/types/product';
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';

const API_URL = 'http://localhost/arclimafrio/api';

export const productService = {
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
      const savedProduct = await response.json();
      
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
      const products = getFromLocalStorage('products', []);
      const filteredProducts = products.filter((p: Product) => p.id !== productId);
      saveToLocalStorage('products', filteredProducts);
      return { message: 'Product deleted successfully' };
    }
  },

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
};