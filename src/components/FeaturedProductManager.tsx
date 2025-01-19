import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import { Product } from '@/types/product';
import { useToast } from '@/components/ui/use-toast';

export const FeaturedProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const loadedProducts = await getFromStorage<Product[]>('products', []);
      // Ensure we have an array of products
      setProducts(Array.isArray(loadedProducts) ? loadedProducts : []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Erro ao carregar produtos",
        description: "Não foi possível carregar a lista de produtos.",
        variant: "destructive"
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (productId: string) => {
    try {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return { ...product, is_featured: !product.is_featured };
        }
        return product;
      });

      await saveToStorage('products', updatedProducts);
      setProducts(updatedProducts);
      toast({
        title: "Sucesso",
        description: "Status do produto atualizado com sucesso.",
      });
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast({
        title: "Erro ao atualizar produto",
        description: "Não foi possível atualizar o status do produto.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Produtos em Destaque</h2>
        {products.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Nenhum produto encontrado.
          </p>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};