import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFromLocalStorage } from "@/utils/localStorage";
import { Product } from "@/types/product";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductDetailImages } from "@/components/product/ProductDetailImages";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: product, isError, error } = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      const products = getFromLocalStorage('products', []) as Product[];
      const foundProduct = products.find((p) => p.id === Number(id));
      
      if (!foundProduct) {
        throw new Error('Product not found');
      }
      
      return {
        id: foundProduct.id,
        title: foundProduct.title,
        price: foundProduct.price,
        image: foundProduct.image,
        images: foundProduct.images,
        description: foundProduct.description,
        isDescriptionActive: foundProduct.isDescriptionActive,
        isImagesActive: foundProduct.isImagesActive,
        isSpecificationsActive: foundProduct.isSpecificationsActive,
        isAdditionalImagesActive: foundProduct.isAdditionalImagesActive,
        isRelatedProductsActive: foundProduct.isRelatedProductsActive,
        relatedProductIds: foundProduct.relatedProductIds,
        specifications: foundProduct.specifications,
        active: foundProduct.active,
        additionalImages: foundProduct.additionalImages,
        pixLink: foundProduct.pixLink
      } as Product;
    }
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-lg">{product.description}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          Preço: {product.price.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          })}
        </h2>
      </div>
      
      <div className="mt-12">
        <RelatedProducts 
          currentProductId={Number(id)}
          isActive={product.isRelatedProductsActive}
          relatedProductIds={product.relatedProductIds}
        />
        <ProductDetailImages 
          title="Produto de qualidade"
          images={product.additionalImages || []}
          isActive={product.isAdditionalImagesActive}
        />
      </div>
    </div>
  );
}