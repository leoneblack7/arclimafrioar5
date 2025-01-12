import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentMethodSelectorProps {
  paymentMethod: "pix" | "credit";
  setPaymentMethod: (method: "pix" | "credit") => void;
}

export function PaymentMethodSelector({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Método de Pagamento</h3>
      <RadioGroup
        value={paymentMethod}
        onValueChange={(value: "pix" | "credit") => setPaymentMethod(value)}
        className="grid grid-cols-2 gap-4"
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
    </div>
  );
}