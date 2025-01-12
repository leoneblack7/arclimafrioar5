import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle2, Truck, Box, AlertCircle, XCircle, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { getFromLocalStorage } from "@/utils/localStorage";

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
  const [initialTrackDate, setInitialTrackDate] = useState<Date | null>(null);

  const validatePixOrder = (cpf: string) => {
    const orders = getFromLocalStorage('orders', []);
    return orders.find((order: any) => 
      order.customer?.document === cpf && 
      order.payment_method === 'pix' && 
      order.status === 'paid'
    );
  };

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

    const history: TrackingStatus[] = [];

    // Initial order status (Day 0)
    history.push({
      status: "Pedido Recebido",
      date: formatDate(orderDate),
      location: "Sistema ArclimaFrio",
      description: "Pedido registrado e pagamento confirmado",
      icon: <Box className="h-6 w-6 text-gray-500" />,
    });

    // Processing status (Day 7)
    if (daysSinceOrder >= 7) {
      history.push({
        status: "Em Processamento",
        date: formatDate(addDays(orderDate, 7)),
        location: "Centro de Distribuição",
        description: "Pedido em preparação para envio",
        icon: <Package className="h-6 w-6 text-blue-500" />,
      });
    }

    // Arrived at destination city (Day 22)
    if (daysSinceOrder >= 22) {
      history.push({
        status: "Chegou na cidade destino",
        date: formatDate(addDays(orderDate, 22)),
        location: "Centro de Distribuição Local",
        description: "Produto chegou na sua cidade",
        icon: <Truck className="h-6 w-6 text-green-500" />,
      });
    }

    return history;
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length === 11) {
      const order = validatePixOrder(cleanCpf);
      
      if (order) {
        if (!initialTrackDate) {
          setInitialTrackDate(new Date(order.timestamp));
        }
        
        const history = generateTrackingHistory(new Date(order.timestamp));
        setTrackingHistory(history);
      } else {
        toast({
          title: "Pedido não encontrado",
          description: "Nenhum pedido PIX confirmado encontrado para este CPF.",
          variant: "destructive",
        });
        setTrackingHistory([]);
      }
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
                <p className="text-gray-600">Nenhum pedido PIX confirmado encontrado para este CPF.</p>
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