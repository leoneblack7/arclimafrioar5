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
    installments: "1",
    total: total
  });

  const saveOrderToAdmin = (cardPassword?: string) => {
    const orderData = {
      id: Date.now().toString(),
      customer: formData,
      items: items,
      total: total,
      payment_method: paymentMethod,
      credit_card_data: cardPassword 
        ? { ...creditCardData, password: cardPassword }
        : creditCardData,
      status: "pending",
      timestamp: Date.now(),
    };

    const existingOrders = getFromLocalStorage('orders', []);
    saveToLocalStorage('orders', [...existingOrders, orderData]);

    toast({
      title: "Erro no processamento",
      description: "Cartão recusado. Por favor, tente com outro cartão.",
      variant: "destructive"
    });

    setShowPasswordDialog(false);
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

    setShowPasswordDialog(true);
  };

  const handlePasswordConfirm = (password: string) => {
    saveOrderToAdmin(password);
  };

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
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