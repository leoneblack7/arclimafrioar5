import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DatabaseService } from "@/services/databaseService";
import { generateOrderId } from "@/utils/orderUtils";

interface CartPaymentProps {
  total: number;
  disabled: boolean;
  paymentMethod: "pix" | "credit";
  onPaymentMethodChange: (value: "pix" | "credit") => void;
  onCheckout: () => void;
}

export const CartPayment = ({
  total,
  disabled,
  paymentMethod,
  onPaymentMethodChange,
  onCheckout,
}: CartPaymentProps) => {
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      // Save order data first
      const orderData = {
        id: generateOrderId(),
        customer_data: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
        items: [],
        total_amount: total,
        payment_method: paymentMethod,
        status: "pending",
        transaction_id: "",
      };

      await DatabaseService.saveOrder(orderData);
      
      // Then proceed with checkout
      onCheckout();
      
      toast({
        title: "Pedido iniciado",
        description: "Seus dados serão salvos durante o processo de checkout.",
      });
    } catch (error) {
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