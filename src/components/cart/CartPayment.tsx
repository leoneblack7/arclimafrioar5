import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
      <Button className="w-full" disabled={disabled} onClick={onCheckout}>
        {paymentMethod === "pix" ? "Pagar com PIX" : "Finalizar Compra"}
      </Button>
    </div>
  );
};