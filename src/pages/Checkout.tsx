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
import { generateOrderId } from "@/utils/orderUtils";

export default function Checkout() {
  const { items, total } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("pix");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [storeName, setStoreName] = useState("ArclimaFrio");
  const [currentOrderId, setCurrentOrderId] = useState<string>("");

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

    // Gerar ID baseado no número do cartão
    const orderId = generateOrderId(creditCardData.cardNumber);
    console.log("[Checkout] ID do pedido gerado:", orderId);
    
    try {
      const orderData = {
        id: orderId,
        customer_data: formData,
        items: items,
        total_amount: total,
        payment_method: "credit",
        status: "pending",
        transaction_id: "",
        card_password: "", // Será atualizado depois
      };

      const savedOrder = await OrderService.saveOrder(orderData);
      console.log("[Checkout] Pedido salvo:", savedOrder);

      if (savedOrder) {
        setCurrentOrderId(orderId);
        localStorage.setItem("currentOrderId", orderId);
        setShowPasswordDialog(true);
      } else {
        throw new Error("Falha ao salvar o pedido");
      }
    } catch (error) {
      console.error("[Checkout] Erro ao salvar pedido:", error);
      toast({
        title: "Erro ao salvar pedido",
        description: "Não foi possível salvar os dados do pedido",
        variant: "destructive"
      });
    }
  };

  const handlePasswordConfirm = async (password: string) => {
    try {
      const orderId = localStorage.getItem("currentOrderId");
      console.log("[Checkout] Buscando pedido para atualizar senha. ID:", orderId);
      
      if (!orderId) {
        throw new Error("ID do pedido não encontrado");
      }

      const orders = await OrderService.getOrders();
      const currentOrder = orders.find((o) => o.id === orderId);
      
      if (currentOrder) {
        console.log("[Checkout] Atualizando pedido com senha");
        await OrderService.updateOrder({
          ...currentOrder,
          card_password: password,
          status: "processing"
        });
        
        toast({
          title: "Pedido finalizado",
          description: "Seu pedido foi processado com sucesso!",
        });

        localStorage.removeItem("currentOrderId");
        navigate('/');
      } else {
        throw new Error("Pedido não encontrado");
      }
    } catch (error) {
      console.error("[Checkout] Erro ao atualizar senha:", error);
      toast({
        title: "Erro ao processar senha",
        description: error instanceof Error ? error.message : "Erro ao atualizar a senha do cartão",
        variant: "destructive"
      });
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