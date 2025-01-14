import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { saveOrder, getOrders, deleteOrder } from "@/utils/databaseService";

export function OrderManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const { toast } = useToast();

  const fetchOrders = () => {
    const allOrders = getOrders();
    const pixOrders = allOrders.filter((order: any) => order.payment_method === 'pix');
    setOrders(pixOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEdit = (order: any) => {
    setEditingOrder(order);
  };

  const handleSave = () => {
    if (!editingOrder) return;

    try {
      saveOrder(editingOrder);
      toast({
        title: "Alterações salvas com sucesso!"
      });
      setEditingOrder(null);
      fetchOrders();
    } catch (error) {
      toast({
        title: "Erro ao salvar alterações",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (orderId: string) => {
    try {
      deleteOrder(orderId);
      toast({
        title: "Pedido deletado com sucesso!"
      });
      fetchOrders();
    } catch (error) {
      toast({
        title: "Erro ao deletar pedido",
        variant: "destructive"
      });
    }
  };

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
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Pedidos PIX</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os pedidos PIX realizados
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      onClick={() => handleEdit(order)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(order.id)}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {editingOrder && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm">Nome do Cliente</label>
                <Input
                  value={editingOrder.customer_data.name}
                  onChange={(e) =>
                    setEditingOrder({
                      ...editingOrder,
                      customer_data: {
                        ...editingOrder.customer_data,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <Input
                  value={editingOrder.customer_data.email}
                  onChange={(e) =>
                    setEditingOrder({
                      ...editingOrder,
                      customer_data: {
                        ...editingOrder.customer_data,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm">Status</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={editingOrder.status}
                  onChange={(e) =>
                    setEditingOrder({
                      ...editingOrder,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="pending">Pendente</option>
                  <option value="generated">Gerado</option>
                  <option value="paid">Pago</option>
                  <option value="error">Erro</option>
                </select>
              </div>
              <Button onClick={handleSave}>Salvar Alterações</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
};
