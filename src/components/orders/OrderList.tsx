import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OrderListProps {
  orders: any[];
  onEdit: (order: any) => void;
  onDelete: (orderId: string) => void;
}

export const OrderList = ({ orders, onEdit, onDelete }: OrderListProps) => {
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-500 hover:bg-yellow-600",
      paid: "bg-green-500 hover:bg-green-600",
      generated: "bg-blue-500 hover:bg-blue-600",
      error: "bg-red-500 hover:bg-red-600"
    };

    return (
      <Badge className={statusStyles[status as keyof typeof statusStyles] || "bg-gray-500"}>
        {status === 'pending' && 'Pendente'}
        {status === 'paid' && 'Pago'}
        {status === 'generated' && 'Gerado'}
        {status === 'error' && 'Erro'}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="font-bold">
                Cliente: {order.customer_data.name}
              </h3>
              <p className="text-sm text-gray-500">
                Email: {order.customer_data.email}
              </p>
              <p className="text-sm text-gray-500">
                Total: R$ {order.total_amount.toFixed(2)}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Status:</span>
                {getStatusBadge(order.status)}
              </div>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => onEdit(order)}
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete(order.id)}
              >
                Deletar
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};