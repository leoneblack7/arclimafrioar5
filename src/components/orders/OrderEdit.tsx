import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OrderEditProps {
  order: any;
  onSave: () => void;
  onOrderChange: (updatedOrder: any) => void;
}

export const OrderEdit = ({ order, onSave, onOrderChange }: OrderEditProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm">Nome do Cliente</label>
            <Input
              value={order.customer_data.name}
              onChange={(e) =>
                onOrderChange({
                  ...order,
                  customer_data: {
                    ...order.customer_data,
                    name: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              value={order.customer_data.email}
              onChange={(e) =>
                onOrderChange({
                  ...order,
                  customer_data: {
                    ...order.customer_data,
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
              value={order.status}
              onChange={(e) =>
                onOrderChange({
                  ...order,
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
          <Button onClick={onSave}>Salvar Alterações</Button>
        </div>
      </CardContent>
    </Card>
  );
};