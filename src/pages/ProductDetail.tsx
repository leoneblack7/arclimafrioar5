import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFromStorage } from '@/utils/storage';
import { Product } from '@/types/product';
import { ProductDetailHeader } from '@/components/product/ProductDetailHeader';
import { ProductDetailImages } from '@/components/product/ProductDetailImages';
import { ProductDetailPrice } from '@/components/product/ProductDetailPrice';
import { ProductDetailActions } from '@/components/product/ProductDetailActions';
import { ProductDetailDescription } from '@/components/product/ProductDetailDescription';
import { ProductDetailShipping } from '@/components/product/ProductDetailShipping';
import { Footer } from '@/components/home/Footer';
import { Navbar } from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const products = await getFromStorage('products', []);
      const product = products.find((p: Product) => p.id === id);
      if (!product) throw new Error('Product not found');
      return product;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image_url,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image_url,
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ProductDetailHeader title={product.title} id={product.id} />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <ProductDetailImages
            title={product.title}
            images={[product.image_url, ...(product.images || [])]}
            isActive={product.isImagesActive}
          />
          <div className="space-y-6">
            <ProductDetailPrice price={product.price} />
            <ProductDetailActions
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
            <ProductDetailShipping />
          </div>
        </div>
        <ProductDetailDescription
          description={product.description}
          isActive={product.isDescriptionActive}
        />
      </div>
      <Footer />
    </div>
  );
}
