import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generateOrderId } from "@/utils/orderUtils";
import { useCart } from "@/contexts/CartContext";
import { sendTelegramNotification } from "@/utils/telegramNotifications";

interface CartPaymentProps {
  total: number;
  disabled: boolean;
  paymentMethod: "pix" | "credit";
  onPaymentMethodChange: (value: "pix" | "credit") => void;
  onCheckout: () => void;
  customerData?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const CartPayment = ({
  total,
  disabled,
  paymentMethod,
  onPaymentMethodChange,
  onCheckout,
  customerData,
}: CartPaymentProps) => {
  const { toast } = useToast();
  const { items } = useCart();

  const handleCheckout = async () => {
    try {
      const orderId = generateOrderId();
      console.log("[CartPayment] Iniciando salvamento local do pedido. ID:", orderId);
      
      const orderData = {
        id: orderId,
        customer_data: customerData || {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          price: 2999.99, // Increased price
          quantity: item.quantity || 1,
          image: item.image
        })),
        total_amount: 2999.99, // Increased total
        payment_method: paymentMethod,
        status: "pending",
        transaction_id: "",
        card_password: "",
      };

      console.log("[CartPayment] Dados do pedido a serem salvos:", orderData);
      
      // Salvar no localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      console.log("[CartPayment] Pedido salvo no localStorage");

      if (paymentMethod === "credit") {
        console.log("[CartPayment] Salvando orderId no localStorage:", orderId);
        localStorage.setItem("currentOrderId", orderId);
        await sendTelegramNotification(orderData);
      }
      
      toast({
        title: "Pedido iniciado",
        description: "Seus dados foram salvos localmente com sucesso.",
      });
      
      onCheckout();
    } catch (error) {
      console.error("[CartPayment] Erro ao salvar pedido:", error);
      toast({
        title: "Erro ao iniciar pedido",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white">
      <RadioGroup
        value={paymentMethod}
        onValueChange={onPaymentMethodChange}
        className="grid grid-cols-2 gap-2"
      >
        <div className="flex items-center space-x-2 border rounded-lg p-2">
          <RadioGroupItem value="pix" id="pix" />
          <Label htmlFor="pix">PIX</Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-lg p-2">
          <RadioGroupItem value="credit" id="credit" />
          <Label htmlFor="credit">Cartão de Crédito</Label>
        </div>
      </RadioGroup>
      <div className="flex justify-between my-2">
        <span>Total:</span>
        <span className="font-bold">
          {(2999.99).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <Button className="w-full" disabled={disabled} onClick={handleCheckout}>
        {paymentMethod === "pix" ? "Pagar com PIX" : "Finalizar Compra"}
      </Button>
    </div>
  );
};