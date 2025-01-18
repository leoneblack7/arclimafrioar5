import { useEffect, useState } from 'react';
import { getFromStorage } from '@/utils/storage';
import { Product } from '@/types/product';

interface RelatedProductsProps {
  productId: string;
}

export const RelatedProducts = ({ productId }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const products = await getFromStorage<Product[]>('products', []);
      const filteredProducts = products.filter(product => product.related_product_ids?.includes(productId));
      setRelatedProducts(filteredProducts);
      setLoading(false);
    };

    fetchRelatedProducts();
  }, [productId]);

  if (loading) {
    return <div>Loading related products...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedProducts.map(product => (
          <div key={product.id} className="border rounded p-4">
            <img src={product.image_url} alt={product.title} className="w-full h-32 object-cover mb-2" />
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-lg font-bold">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
