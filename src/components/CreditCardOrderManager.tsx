import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

export function CreditCardOrderManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchOrders = () => {
    const allOrders = getFromLocalStorage('orders', []);
    const creditOrders = allOrders.filter((order: any) => order.payment_method === 'credit');
    setOrders(creditOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCopyData = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Dados copiados para a área de transferência"
    });
  };

  const handleDelete = (orderId: string) => {
    const allOrders = getFromLocalStorage('orders', []);
    const updatedOrders = allOrders.filter((order: any) => order.id !== orderId);
    saveToLocalStorage('orders', updatedOrders);
    
    toast({
      title: "Pedido deletado com sucesso!"
    });

    fetchOrders();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Pedidos com Cartão de Crédito</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os pedidos realizados com cartão de crédito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="space-y-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded">
                    {order.formatted_text}
                  </pre>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleCopyData(order.formatted_text)}
                    >
                      Copiar Dados
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(order.id)}
                    >
                      Deletar Pedido
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}