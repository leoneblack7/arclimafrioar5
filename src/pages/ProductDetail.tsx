import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Produto</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                alt="Produto"
                className="w-full rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Ar Condicionado Split</h1>
              <p className="text-gray-600">
                Descrição detalhada do produto será carregada aqui...
              </p>
              <div className="text-2xl font-bold">R$ 1.999,99</div>
              <Button className="w-full">Adicionar ao Carrinho</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}