import { Card, CardContent } from "@/components/ui/card";
import { OrderCard } from "./OrderCard";

interface OrderListProps {
  orders: any[];
  onCopyData: (text: string) => void;
  onDownloadTxt: (order: any) => void;
  onDelete: (orderId: string) => void;
}

export function OrderList({ orders, onCopyData, onDownloadTxt, onDelete }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        Nenhum pedido com cartão de crédito encontrado
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onCopyData={onCopyData}
          onDownloadTxt={onDownloadTxt}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}