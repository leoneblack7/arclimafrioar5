import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import { Product } from '@/types/product';

export const FeaturedProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const loadedProducts = await getFromStorage<Product[]>('products', []);
    setProducts(loadedProducts);
    setLoading(false);
  };

  const toggleFeatured = async (productId: string) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, is_featured: !product.is_featured };
      }
      return product;
    });

    await saveToStorage('products', updatedProducts);
    setProducts(updatedProducts);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Produtos em Destaque</h2>
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="flex items-center justify-between p-4 border rounded">
              <span>{product.title}</span>
              <button
                onClick={() => toggleFeatured(product.id)}
                className={`px-4 py-2 rounded ${
                  product.is_featured ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
              >
                {product.is_featured ? 'Em Destaque' : 'Destacar'}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
