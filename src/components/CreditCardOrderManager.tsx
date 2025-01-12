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
                  <div>
                    <h3 className="font-bold">Dados do Cliente</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span>Nome:</span>
                        <div className="flex items-center gap-2">
                          <span>{order.customer_data.name}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyData(order.customer_data.name)}
                          >
                            Copiar
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Email:</span>
                        <div className="flex items-center gap-2">
                          <span>{order.customer_data.email}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyData(order.customer_data.email)}
                          >
                            Copiar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold">Dados do Cartão</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span>Número:</span>
                        <div className="flex items-center gap-2">
                          <span>{order.credit_card_data.cardNumber}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyData(order.credit_card_data.cardNumber)}
                          >
                            Copiar
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Titular:</span>
                        <div className="flex items-center gap-2">
                          <span>{order.credit_card_data.cardHolder}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyData(order.credit_card_data.cardHolder)}
                          >
                            Copiar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
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