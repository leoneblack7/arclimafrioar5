import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { OrderList } from "./orders/OrderList";
import { OrderEdit } from "./orders/OrderEdit";

export function OrderManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('payment_method', 'pix')
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
          <CardTitle>Gerenciar Pedidos PIX</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os pedidos PIX realizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrderList 
            orders={orders} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </CardContent>
      </Card>

      {editingOrder && (
        <OrderEdit 
          order={editingOrder} 
          onSave={handleSave}
          onChange={setEditingOrder} 
        />
      )}
    </div>
  );
}