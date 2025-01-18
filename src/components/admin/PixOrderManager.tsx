import { useEffect, useState } from 'react';
import { getFromStorage } from '@/utils/storage';
import { Order } from '@/types/storage';

export const PixOrderManager = () => {
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
      <h2 className="text-2xl font-bold mb-4">Gerenciar Pedidos PIX</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.customer_data?.name}</td>
              <td className="border px-4 py-2">
                {order.total_amount.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </td>
              <td className="border px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
