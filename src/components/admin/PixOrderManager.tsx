import { useEffect, useState } from 'react';
import { mysqlService } from '@/utils/storage';
import { Order } from '@/types/storage';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const PixOrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await mysqlService.getOrders();
      
      // Ensure we have an array of orders
      let ordersArray: Order[] = [];
      
      if (typeof response === 'string') {
        try {
          ordersArray = JSON.parse(response);
        } catch {
          throw new Error('Invalid response format');
        }
      } else if (Array.isArray(response)) {
        ordersArray = response;
      } else {
        throw new Error('Invalid response format');
      }

      // Filter for PIX orders only
      const pixOrders = ordersArray.filter(order => 
        order.payment_method === 'pix' || 
        order.payment_method === 'PIX'
      );

      setOrders(pixOrders);
      setError(null);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Erro ao carregar pedidos. Por favor, tente novamente.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">{error}</div>
      </Card>
    );
  }

  if (!orders.length) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          Nenhum pedido PIX encontrado.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciar Pedidos PIX</h2>
      <div className="rounded-lg border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Cliente</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-sm">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.customer_data?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm">
                  {order.total_amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
                <td className="px-6 py-4 text-sm">{order.status}</td>
                <td className="px-6 py-4 text-sm">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};