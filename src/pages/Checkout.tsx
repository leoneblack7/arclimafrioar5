import { useEffect, useState } from "react";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { PaymentMethodSelector } from "@/components/checkout/PaymentMethodSelector";
import { CreditCardForm } from "@/components/checkout/CreditCardForm";
import { CardPasswordDialog } from "@/components/checkout/CardPasswordDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { mysqlService } from "@/utils/mysqlService";

const Checkout = () => {
  const [customerData, setCustomerData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isCardPasswordDialogOpen, setIsCardPasswordDialogOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const handleCustomerDataChange = (data) => {
    setCustomerData(data);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleOrderCompletion = async () => {
    try {
      const order = {
        customer_data: customerData,
        payment_method: paymentMethod,
      };
      const response = await mysqlService.saveOrder(order);
      setOrderId(response.id);
      toast.success("Order placed successfully!");
      navigate(`/order/${response.id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    if (orderId) {
      // Logic to handle post-order placement actions
    }
  }, [orderId]);

  return (
    <div className="checkout-container">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <CustomerForm onChange={handleCustomerDataChange} />
      <PaymentMethodSelector onChange={handlePaymentMethodChange} />
      {paymentMethod === "credit_card" && (
        <CreditCardForm onComplete={handleOrderCompletion} />
      )}
      <CardPasswordDialog
        isOpen={isCardPasswordDialogOpen}
        onClose={() => setIsCardPasswordDialogOpen(false)}
        onConfirm={handleOrderCompletion}
      />
    </div>
  );
};

export default Checkout;
