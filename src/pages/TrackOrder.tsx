import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle2, Truck, Box, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";

type TrackingStatus = {
  status: string;
  date: string;
  location: string;
  description: string;
  icon: JSX.Element;
};

export default function TrackOrder() {
  const [cpf, setCpf] = useState("");
  const [trackingHistory, setTrackingHistory] = useState<TrackingStatus[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    // Simulação de status de pedido com timeline
    setTrackingHistory([
      {
        status: "Pedido Entregue",
        date: "15/03/2024 15:30",
        location: "São Paulo, SP",
        description: "Entrega realizada com sucesso",
        icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
      },
      {
        status: "Em rota de entrega",
        date: "15/03/2024 09:15",
        location: "São Paulo, SP",
        description: "Saiu para entrega ao destinatário",
        icon: <Truck className="h-6 w-6 text-blue-500" />,
      },
      {
        status: "Em trânsito",
        date: "14/03/2024 16:45",
        location: "Guarulhos, SP",
        description: "Objeto em trânsito para São Paulo",
        icon: <Package className="h-6 w-6 text-yellow-500" />,
      },
      {
        status: "Pedido recebido",
        date: "13/03/2024 10:20",
        location: "Guarulhos, SP",
        description: "Pedido recebido para envio",
        icon: <Box className="h-6 w-6 text-gray-500" />,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Rastreamento de Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrack} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="cpf" className="text-sm font-medium">
                  CPF do Comprador
                </label>
                <Input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Digite o CPF utilizado na compra"
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Rastrear Pedido
              </Button>
            </form>

            {isTracking && trackingHistory.length === 0 && (
              <div className="mt-8 text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto" />
                <p className="text-gray-600">Nenhum pedido encontrado para este CPF.</p>
              </div>
            )}

            {trackingHistory.length > 0 && (
              <div className="mt-8 space-y-8">
                <div className="relative">
                  {trackingHistory.map((status, index) => (
                    <div key={index} className="flex items-start mb-8 relative">
                      <div className="flex-shrink-0 mr-4">{status.icon}</div>
                      {index !== trackingHistory.length - 1 && (
                        <div className="absolute left-3 top-6 w-0.5 h-full bg-gray-200" />
                      )}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900">{status.status}</h3>
                          <span className="text-sm text-gray-500">{status.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{status.location}</p>
                        <p className="text-sm text-gray-700 mt-1">{status.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}