import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFromLocalStorage } from '@/utils/localStorage';
import { Product } from '@/types/product';
import { ProductDetailHeader } from '@/components/product/ProductDetailHeader';
import { ProductDetailImages } from '@/components/product/ProductDetailImages';
import { ProductDetailDescription } from '@/components/product/ProductDetailDescription';
import { ProductDetailPrice } from '@/components/product/ProductDetailPrice';
import { ProductDetailActions } from '@/components/product/ProductDetailActions';
import { ProductDetailShipping } from '@/components/product/ProductDetailShipping';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ProductGallery } from '@/components/product/ProductGallery';
import { Footer } from '@/components/home/Footer';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const products = getFromLocalStorage('products', []) as Product[];
      const foundProduct = products.find((p) => p.id === id);
      
      if (!foundProduct) {
        throw new Error('Produto não encontrado');
      }

      return {
        ...foundProduct,
        images: foundProduct.images || [foundProduct.image_url],
        isDescriptionActive: foundProduct.isDescriptionActive ?? true,
        isImagesActive: foundProduct.isImagesActive ?? true,
        isSpecificationsActive: foundProduct.isSpecificationsActive ?? true,
        isAdditionalImagesActive: foundProduct.isAdditionalImagesActive ?? true,
        isRelatedProductsActive: foundProduct.isRelatedProductsActive ?? true,
        relatedProductIds: foundProduct.relatedProductIds || [],
      } as Product;
    }
  });

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image_url: product.image_url,
        quantity: 1
      });
      toast.success('Produto adicionado ao carrinho!');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image_url: product.image_url,
        quantity: 1
      });
      navigate('/checkout');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600">Erro ao carregar o produto</h2>
        <p className="text-gray-600">Produto não encontrado ou ocorreu um erro ao carregar os dados.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 mb-4">
        <ProductDetailHeader 
          title={product.title} 
          id={product.id} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <ProductGallery 
            images={[product.image_url, ...(product.images || [])]}
          />
          
          <div className="space-y-6">
            <ProductDetailPrice price={product.price} />
            <ProductDetailActions 
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
            <ProductDetailShipping />
            <ProductDetailDescription 
              description={product.description}
              isActive={product.isDescriptionActive}
            />
          </div>
        </div>

        <ProductDetailImages 
          title={product.title}
          images={product.additionalImages || []}
          isActive={product.isAdditionalImagesActive}
        />

        <RelatedProducts 
          currentProductId={product.id}
          isActive={product.isRelatedProductsActive}
          relatedProductIds={product.relatedProductIds}
        />
      </div>

      <Footer />
    </div>
  );
}
