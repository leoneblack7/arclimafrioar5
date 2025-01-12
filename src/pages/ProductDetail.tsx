import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFromLocalStorage } from "@/utils/localStorage";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecs } from "@/components/product/ProductSpecs";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="grid md:grid-cols-2 gap-8">
          <ProductGallery images={[product.image]} />
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-sm text-gray-500">Código: {product.id}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="h-6 w-6" />
              </Button>
            </div>
            
            <ProductSpecs />

            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {product.price.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </div>
              <p className="text-sm text-gray-500">
                Ou 10x de {(product.price / 10).toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </p>
              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-green-500 hover:bg-green-600" 
                  size="lg"
                  onClick={handleBuyNow}
                >
                  COMPRAR AGORA
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1" 
                  size="lg"
                  onClick={handleAddToCart}
                >
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Calcule o valor do Frete e Prazo de entrega</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  className="flex-1 border rounded px-3 py-2 text-sm"
                />
                <Button variant="outline" size="sm">
                  Calcular
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}