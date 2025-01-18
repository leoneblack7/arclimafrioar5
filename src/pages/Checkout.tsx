import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { PaymentMethodSelector } from "@/components/checkout/PaymentMethodSelector";
import { CreditCardForm, CreditCardData } from "@/components/checkout/CreditCardForm";
import { CardPasswordDialog } from "@/components/checkout/CardPasswordDialog";
import { getFromStorage, saveToStorage } from '@/utils/storage';
import { sendTictoWebhookV2 } from "@/utils/tictoWebhookV2";
import { useNavigate, Link } from "react-router-dom";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("pix");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [storeName, setStoreName] = useState("ArclimaFrio");

  // Add back the formData state
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

  // Add back the creditCardData state
  const [creditCardData, setCreditCardData] = useState<CreditCardData>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    installments: "1",
    total: total
  });

  useEffect(() => {
    const savedLogo = localStorage.getItem("storeLogoUrl");
    const savedName = localStorage.getItem("storeName");
    if (savedLogo) setLogoUrl(savedLogo);
    if (savedName) setStoreName(savedName);
  }, []);

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
        {/* Logo Section */}
        <Link to="/" className="block text-center mb-8">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={storeName} 
              className="h-16 mx-auto object-contain hover:opacity-80 transition-opacity"
            />
          ) : (
            <h1 className="text-3xl font-bold text-primary hover:opacity-80 transition-opacity">
              {storeName}
            </h1>
          )}
        </Link>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Produtos no Carrinho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Quantidade: {item.quantity}
                    </p>
                    <p className="font-medium">
                      {(item.price * (item.quantity || 1)).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 font-bold">
                <span>Total:</span>
                <span>
                  {total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

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
