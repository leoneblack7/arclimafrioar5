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
import { Download } from "lucide-react";
import { OrderList } from "./credit-card-orders/OrderList";
import { formatOrderData } from "@/utils/orderFormatter";

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

  const handleDownloadAllTxt = () => {
    if (orders.length === 0) {
      toast({
        title: "Nenhum pedido para baixar"
      });
      return;
    }

    const allOrdersContent = orders.map(order => formatOrderData(order)).join('\n');
    const blob = new Blob([allOrdersContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-pedidos-cartao.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Arquivo TXT com todos os pedidos baixado com sucesso!"
    });
  };

  const handleDownloadTxt = (order: any) => {
    const content = formatOrderData(order);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pedido-${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Arquivo TXT baixado com sucesso!"
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Pedidos com Cartão erros</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os pedidos com cartão de crédito que apresentaram erro
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={handleDownloadAllTxt}
              className="ml-4"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <OrderList
            orders={orders}
            onCopyData={handleCopyData}
            onDownloadTxt={handleDownloadTxt}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}