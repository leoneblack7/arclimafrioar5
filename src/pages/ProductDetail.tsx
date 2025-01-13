import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { getFromLocalStorage } from "@/utils/localStorage";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductDetailHeader } from "@/components/product/ProductDetailHeader";
import { ProductDetailPrice } from "@/components/product/ProductDetailPrice";
import { ProductDetailActions } from "@/components/product/ProductDetailActions";
import { ProductDetailShipping } from "@/components/product/ProductDetailShipping";
import { ProductDetailDescription } from "@/components/product/ProductDetailDescription";
import { ProductDetailImages } from "@/components/product/ProductDetailImages";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const products = getFromLocalStorage("products", []);
      const product = products.find((p: any) => p.id === Number(id));
      if (!product) throw new Error("Produto não encontrado");
      return product;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-16 md:pt-24">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-16 md:pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Produto não encontrado</h1>
            <Button onClick={() => navigate("/produtos")} className="mt-4">
              Voltar para Produtos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    addItem(product);
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  const productImages = product.images?.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-16 md:pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="w-full">
            <ProductGallery images={productImages} />
          </div>
          <div className="space-y-4 md:space-y-6">
            <ProductDetailHeader title={product.title} id={product.id} />
            <ProductDetailPrice price={product.price} />
            <ProductDetailActions 
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
            />
            <ProductDetailShipping />
            <ProductDetailDescription 
              description={product.description}
              isActive={product.isDescriptionActive}
            />
            <ProductSpecs 
              specifications={product.specifications}
              isActive={product.isSpecificationsActive}
            />
            <ProductDetailImages 
              title="Imagens Adicionais"
              images={product.additionalImages || []}
              isActive={product.isAdditionalImagesActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
}