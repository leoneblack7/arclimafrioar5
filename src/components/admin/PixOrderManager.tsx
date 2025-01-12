import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFromLocalStorage } from "@/utils/localStorage";
import { Badge } from "@/components/ui/badge";

export const PixOrderManager = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const allOrders = getFromLocalStorage('orders', []);
    const pixOrders = allOrders.filter((order: any) => order.payment_method === 'pix');
    setOrders(pixOrders);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pedidos PIX</CardTitle>
          <CardDescription>
            Visualize todos os pedidos realizados via PIX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{formatDate(order.timestamp)}</TableCell>
                  <TableCell>{order.product.title}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>
                    {order.total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={order.status === 'paid' ? 'success' : 'secondary'}
                    >
                      {order.status === 'paid' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};