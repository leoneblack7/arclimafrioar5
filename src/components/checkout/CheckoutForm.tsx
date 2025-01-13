import { CustomerForm } from "./CustomerForm";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { CreditCardForm } from "./CreditCardForm";
import { Button } from "@/components/ui/button";

interface CheckoutFormProps {
  formData: any;
  setFormData: (data: any) => void;
  paymentMethod: "pix" | "credit";
  setPaymentMethod: (method: "pix" | "credit") => void;
  creditCardData: any;
  setCreditCardData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CheckoutForm({
  formData,
  setFormData,
  paymentMethod,
  setPaymentMethod,
  creditCardData,
  setCreditCardData,
  onSubmit
}: CheckoutFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
  );
}