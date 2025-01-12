import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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

export function OrderManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar pedidos",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEdit = (order: any) => {
    setEditingOrder(order);
  };

  const handleSave = async () => {
    if (!editingOrder) return;

    const { error } = await supabase
      .from('orders')
      .update(editingOrder)
      .eq('id', editingOrder.id);

    if (error) {
      toast({
        title: "Erro ao salvar alterações",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Alterações salvas com sucesso!"
    });

    setEditingOrder(null);
    fetchOrders();
  };

  const handleDelete = async (orderId: string) => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) {
      toast({
        title: "Erro ao deletar pedido",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pedido deletado com sucesso!"
    });

    fetchOrders();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Pedidos</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os pedidos realizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">
                      Cliente: {order.customer_data.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Email: {order.customer_data.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: R$ {order.total_amount.toFixed(2)}
                    </p>
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
              <Button onClick={handleSave}>Salvar Alterações</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}