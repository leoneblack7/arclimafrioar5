import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrackOrder() {
  const [cpf, setCpf] = useState("");
  const [orderStatus, setOrderStatus] = useState<null | {
    status: string;
    date: string;
    description: string;
  }>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de status de pedido
    setOrderStatus({
      status: "Em processamento",
      date: new Date().toLocaleDateString(),
      description: "Seu pedido está sendo processado",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Rastreamento de Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrack} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="cpf" className="text-sm font-medium">
                  CPF
                </label>
                <Input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Digite seu CPF"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Rastrear Pedido
              </Button>
            </form>

            {orderStatus && (
              <div className="mt-8 space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold">{orderStatus.status}</h3>
                  <p className="text-sm text-gray-600">{orderStatus.date}</p>
                  <p className="mt-2">{orderStatus.description}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}