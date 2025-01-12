import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <Card>
          <CardHeader>
            <CardTitle>Carrinho de Compras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center text-gray-500">
                Seu carrinho está vazio
              </div>
              <Button
                onClick={() => navigate("/checkout")}
                className="w-full"
                disabled
              >
                Finalizar Compra
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}