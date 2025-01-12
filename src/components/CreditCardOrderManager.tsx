import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { formatOrderData } from "@/utils/orderFormatter";
import { OrderList } from "./credit-card-orders/OrderList";
import { OrderManagerHeader } from "./credit-card-orders/OrderManagerHeader";
import { useCreditCardOrders } from "@/hooks/useCreditCardOrders";

export function CreditCardOrderManager() {
  const { orders, handleCopyData, handleDelete } = useCreditCardOrders();
  const { toast } = useToast();

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
        <OrderManagerHeader onDownloadAll={handleDownloadAllTxt} />
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