import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { PaymentMethodSelector } from "@/components/checkout/PaymentMethodSelector";
import { CreditCardForm } from "@/components/checkout/CreditCardForm";

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
        customer_data: formData,
        items: items,
        total_amount: total,
        payment_method: paymentMethod,
        credit_card_data: paymentMethod === "credit" ? creditCardData : null,
        status: "pending",
        created_at: new Date().toISOString()
      };

      // Primeiro salvamos os dados do pedido
      const { error: saveError } = await supabase
        .from('orders')
        .insert([orderData]);

      if (saveError) throw saveError;

      if (paymentMethod === "credit") {
        // Simulamos um erro no processamento do pagamento
        throw new Error("Erro no processamento do pagamento. Tente novamente mais tarde.");
      }

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