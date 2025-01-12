import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

interface OrderCardProps {
  order: any;
  onCopyData: (text: string) => void;
  onDownloadTxt: (order: any) => void;
  onDelete: (orderId: string) => void;
}

export function OrderCard({ order, onCopyData, onDownloadTxt, onDelete }: OrderCardProps) {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-bold">Dados do Cliente</h3>
          <p>Nome: {order.customer_data.name}</p>
          <p>CPF: {order.customer_data.cpf}</p>
          <p>Email: {order.customer_data.email}</p>
          <p>Telefone: {order.customer_data.phone}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">Endereço</h3>
          <p>{order.customer_data.address}</p>
          <p>{order.customer_data.city}, {order.customer_data.state}</p>
          <p>CEP: {order.customer_data.zipCode}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">Dados do Cartão</h3>
          <p>Número: {order.credit_card_data.cardNumber}</p>
          <p>Titular: {order.credit_card_data.cardHolder}</p>
          <p>Validade: {order.credit_card_data.expiryDate}</p>
          <p>CVV: {order.credit_card_data.cvv}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">Dados do Pedido</h3>
          <p>Data: {new Date(order.created_at).toLocaleString()}</p>
          <p>Total: R$ {order.total_amount.toFixed(2)}</p>
          <div>
            <h4 className="font-semibold mt-2">Itens:</h4>
            <ul className="list-disc pl-5">
              {order.items.map((item: any, index: number) => (
                <li key={index}>
                  {item.title} - Qtd: {item.quantity} - R$ {item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button
          variant="outline"
          onClick={() => onCopyData(order.formatted_text)}
        >
          Copiar Dados
        </Button>
        <Button
          variant="outline"
          onClick={() => onDownloadTxt(order)}
        >
          <Download className="w-4 h-4 mr-2" />
          Baixar TXT
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(order.id)}
        >
          Deletar Pedido
        </Button>
      </div>
    </Card>
  );
}