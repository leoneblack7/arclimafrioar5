import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { mysqlService } from '@/utils/mysqlService';
import { Order } from '@/types/storage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export const PixPaymentManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await mysqlService.getOrders();
      console.log('Orders response:', response); // Debug log
      
      // Ensure we have a valid array response
      if (!response) {
        setOrders([]);
        return;
      }

      // Parse the response if it's a string
      const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
      
      // Filter only PIX orders and ensure we have an array
      const pixOrders = Array.isArray(parsedResponse) 
        ? parsedResponse.filter(order => order.payment_method === 'pix')
        : [];
      
      setOrders(pixOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Erro ao carregar pedidos PIX');
      setOrders([]); // Set empty array on error
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

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Nenhum pedido PIX encontrado
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Gerenciar Pagamentos PIX</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pedido #{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  Cliente: {order.customer_data?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Valor: {order.total_amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Implement copy function if needed
                    toast.success('Dados copiados para a área de transferência');
                  }}
                >
                  Copiar Dados
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};