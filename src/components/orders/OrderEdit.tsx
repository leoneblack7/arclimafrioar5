import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface OrderEditProps {
  order: any;
  onSave: () => void;
  onChange: (order: any) => void;
}

export function OrderEdit({ order, onSave, onChange }: OrderEditProps) {
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
                onChange({
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
                onChange({
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
                onChange({
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
}