import { DatabaseService } from './databaseService';

interface Product {
  id?: number;
  title: string;
  price: number;
  description?: string;
  image?: string;
  images?: string[];
  active?: boolean;
}

export const ProductService = {
  async getProducts() {
    return await DatabaseService.getProducts();
  },

  async saveProduct(product: Product) {
    return await DatabaseService.saveProduct(product);
  },

  async deleteProduct(productId: number) {
    return await DatabaseService.deleteProduct(productId);
  }
};