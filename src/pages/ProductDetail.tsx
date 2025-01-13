import { useParams } from 'react-router-dom';
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

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const products = getFromLocalStorage('products', []) as Product[];
      const foundProduct = products.find((p) => p.id === Number(id));
      
      if (!foundProduct) {
        throw new Error('Produto não encontrado');
      }

      return {
        id: foundProduct.id,
        title: foundProduct.title || '',
        price: foundProduct.price || 0,
        image: foundProduct.image || '',
        images: foundProduct.images || [],
        description: foundProduct.description || '',
        isDescriptionActive: foundProduct.isDescriptionActive ?? true,
        isImagesActive: foundProduct.isImagesActive ?? true,
        isSpecificationsActive: foundProduct.isSpecificationsActive ?? true,
        isAdditionalImagesActive: foundProduct.isAdditionalImagesActive ?? true,
        isRelatedProductsActive: foundProduct.isRelatedProductsActive ?? true,
        relatedProductIds: foundProduct.relatedProductIds || [],
        specifications: foundProduct.specifications || '',
        active: foundProduct.active ?? true,
        additionalImages: foundProduct.additionalImages || [],
        pixLink: foundProduct.pixLink || ''
      };
    }
  });

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
    <div className="container mx-auto px-4 py-8">
      <ProductDetailHeader title={product.title} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <ProductDetailImages 
          mainImage={product.image}
          additionalImages={product.additionalImages}
          isAdditionalImagesActive={product.isAdditionalImagesActive}
        />
        
        <div className="space-y-6">
          <ProductDetailPrice price={product.price} />
          <ProductDetailActions product={product} />
          <ProductDetailShipping />
          <ProductDetailDescription 
            description={product.description}
            specifications={product.specifications}
            isDescriptionActive={product.isDescriptionActive}
            isSpecificationsActive={product.isSpecificationsActive}
          />
        </div>
      </div>

      {product.isRelatedProductsActive && product.relatedProductIds && (
        <RelatedProducts 
          productIds={product.relatedProductIds}
          currentProductId={product.id}
        />
      )}
    </div>
  );
}