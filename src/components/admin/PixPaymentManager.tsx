import { useEffect, useState } from 'react';
import { getFromStorage } from '@/utils/storage';
import { Order } from '@/types/storage';

export const PixPaymentManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const loadedOrders = await getFromStorage<Order[]>('orders', []);
    setOrders(loadedOrders);
    setLoading(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gerenciar Pagamentos PIX</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="flex items-center justify-between p-4 border rounded">
            <span>{order.id}</span>
            <span>{order.total_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
