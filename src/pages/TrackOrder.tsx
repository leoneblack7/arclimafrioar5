import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle2, Truck, Box, AlertCircle, XCircle, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";

interface TrackingStatus {
  status: string;
  date: string;
  location: string;
  description: string;
  icon: JSX.Element;
}

export default function TrackOrder() {
  const { toast } = useToast();
  const [cpf, setCpf] = useState("");
  const [trackingHistory, setTrackingHistory] = useState<TrackingStatus[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const generateTrackingHistory = (orderDate: Date) => {
    const addDays = (date: Date, days: number) => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + days);
      return newDate;
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const currentDate = new Date();
    const daysSinceOrder = Math.floor((currentDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

    const history: TrackingStatus[] = [
      {
        status: "Pedido Recebido",
        date: formatDate(orderDate),
        location: "Sistema ArclimaFrio",
        description: "Pedido registrado e pagamento confirmado",
        icon: <Box className="h-6 w-6 text-gray-500" />,
      },
    ];

    if (daysSinceOrder >= 7) {
      history.unshift({
        status: "Em Processamento",
        date: formatDate(addDays(orderDate, 7)),
        location: "Centro de Distribuição",
        description: "Pedido em preparação para envio",
        icon: <Package className="h-6 w-6 text-blue-500" />,
      });
    }

    if (daysSinceOrder >= 22) {
      history.unshift({
        status: "Chegou na cidade destino",
        date: formatDate(addDays(orderDate, 22)),
        location: "Centro de Distribuição Local",
        description: "Produto chegou na sua cidade",
        icon: <Truck className="h-6 w-6 text-green-500" />,
      });
    }

    if (daysSinceOrder >= 29) {
      history.unshift({
        status: "Tentativa de entrega",
        date: formatDate(addDays(orderDate, 29)),
        location: "Rota de Entrega",
        description: "Tentativa de entrega - Destinatário ausente",
        icon: <XCircle className="h-6 w-6 text-red-500" />,
      });
    }

    if (daysSinceOrder >= 36) {
      history.unshift({
        status: "Nova tentativa de entrega",
        date: formatDate(addDays(orderDate, 36)),
        location: "Rota de Entrega",
        description: "Segunda tentativa de entrega - Destinatário ausente",
        icon: <Clock className="h-6 w-6 text-yellow-500" />,
      });
    }

    // Continue adding failed delivery attempts every 7 days
    let additionalAttempts = Math.floor((daysSinceOrder - 36) / 7);
    for (let i = 0; i < additionalAttempts; i++) {
      history.unshift({
        status: `Tentativa de entrega ${i + 3}`,
        date: formatDate(addDays(orderDate, 36 + (i + 1) * 7)),
        location: "Rota de Entrega",
        description: "Tentativa de entrega - Destinatário ausente",
        icon: <AlertCircle className="h-6 w-6 text-orange-500" />,
      });
    }

    return history;
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    
    // Simulate finding an order with the CPF
    // Using a fixed date 30 days ago for demonstration
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - 30);
    
    if (cpf.length === 11) {
      const history = generateTrackingHistory(orderDate);
      setTrackingHistory(history);
    } else {
      toast({
        title: "Erro",
        description: "CPF inválido. Por favor, digite um CPF válido.",
        variant: "destructive",
      });
      setTrackingHistory([]);
    }
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
                  onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
                  placeholder="Digite o CPF utilizado na compra"
                  className="w-full"
                  maxLength={11}
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