import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CardPasswordDialog } from "@/components/checkout/CardPasswordDialog";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { OrderService } from "@/services/orderService";
import { sendTictoWebhookV2 } from "@/utils/tictoWebhookV2";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, total } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("pix");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [storeName, setStoreName] = useState("ArclimaFrio");

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
    installments: "1",
    total: total
  });

  useEffect(() => {
    const savedLogo = localStorage.getItem("storeLogoUrl");
    const savedName = localStorage.getItem("storeName");
    if (savedLogo) setLogoUrl(savedLogo);
    if (savedName) setStoreName(savedName);
  }, []);

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

  const handlePasswordConfirm = async (password: string) => {
    const orderId = localStorage.getItem("currentOrderId");
    if (orderId) {
      const orders = await OrderService.getOrders();
      const currentOrder = orders.find((o) => o.id === orderId);
      
      if (currentOrder) {
        await OrderService.updateOrder({
          ...currentOrder,
          card_password: password,
        });
        
        toast({
          title: "Senha salva",
          description: "A senha do cartão foi salva com sucesso.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 pt-24">
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

        <CheckoutSummary items={items} total={total} />

        <Card>
          <CardHeader>
            <CardTitle>Finalizar Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckoutForm 
              formData={formData}
              setFormData={setFormData}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              creditCardData={creditCardData}
              setCreditCardData={setCreditCardData}
              onSubmit={handleSubmit}
            />
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