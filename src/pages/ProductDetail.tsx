import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductSpecifications } from "@/components/product/ProductSpecifications";
import { ProductActions } from "@/components/product/ProductActions";
import { useQuery } from "@tanstack/react-query";
import { getFromLocalStorage } from "@/utils/localStorage";

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
        <div className="container mx-auto px-4 pt-24">
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
        <div className="container mx-auto px-4 pt-24">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Produto não encontrado</h1>
              <Button onClick={() => navigate("/produtos")} className="mt-4">
                Voltar para Produtos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <Card>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full rounded-lg object-cover aspect-square"
                />
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, index) => (
                    <img
                      key={index}
                      src={product.image}
                      alt={`${product.title} - Imagem ${index + 1}`}
                      className="w-full rounded-lg object-cover aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <ProductPrice price={product.price} className="text-2xl" />
                <div className="prose max-w-none">
                  <p className="text-gray-600">{product.description}</p>
                </div>
                <ProductSpecifications className="h-12" />
                <ProductActions onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}