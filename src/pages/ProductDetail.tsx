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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [cep, setCep] = useState("");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const products = getFromLocalStorage("products", []);
      const product = products.find((p: any) => p.id === Number(id));
      if (!product) throw new Error("Produto não encontrado");
      return product;
    }
  });

  const handleCalculateShipping = () => {
    if (cep.length < 8) {
      toast.error("Digite um CEP válido");
      return;
    }
    toast.success("Frete calculado com sucesso!");
  };

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
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-sm text-gray-500">Código: {product.id}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="h-6 w-6" />
              </Button>
            </div>
            
            <ProductSpecs />

            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {product.price.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </div>
              <p className="text-sm text-gray-500">
                Ou 12x de {(product.price / 12).toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })} sem juros
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-lg py-6" 
                  onClick={handleBuyNow}
                >
                  COMPRAR AGORA
                </Button>
                <Button 
                  variant="outline"
                  className="w-full text-lg py-6" 
                  onClick={handleAddToCart}
                >
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <p className="text-sm font-medium">Calcule o valor do Frete e Prazo de entrega</p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  maxLength={8}
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleCalculateShipping}>
                  Calcular
                </Button>
              </div>
              {cep.length === 8 && (
                <div className="text-sm space-y-1">
                  <p className="text-green-600 font-medium">✓ Frete Grátis</p>
                  <p className="text-gray-600">Prazo de entrega: 15 dias úteis</p>
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Descrição do Produto</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}