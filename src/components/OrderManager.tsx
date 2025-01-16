import { useEffect, useState } from "react";
import { getOrders } from "@/utils/databaseService";
import { Order } from "@/types/product";
import { toast } from "sonner";

export const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await getOrders();
      if (Array.isArray(fetchedOrders)) {
        const creditCardOrders = fetchedOrders.filter(
          (order) => order.payment_method === "credit_card"
        );
        setOrders(creditCardOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Gerenciar Pedidos</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border-b py-2">
              <p>ID do Pedido: {order.id}</p>
              <p>Data: {new Date(order.created_at).toLocaleString()}</p>
              <p>Total: {order.total_amount.toFixed(2)} BRL</p>
              <p>Método de Pagamento: {order.payment_method}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
