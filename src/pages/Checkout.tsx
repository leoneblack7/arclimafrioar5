import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("pix");
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const orderData = {
        customer_data: formData,
        items: items,
        total_amount: total,
        payment_method: paymentMethod,
        credit_card_data: paymentMethod === "credit" ? creditCardData : null,
        status: "pending",
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

      toast({
        title: "Pedido realizado com sucesso!",
        description: "Você receberá um email com os detalhes do pedido."
      });

      clearCart();
      setFormData({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      });
      setCreditCardData({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
      });
    } catch (error) {
      toast({
        title: "Erro ao processar pedido",
        description: "Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <Card>
          <CardHeader>
            <CardTitle>Finalizar Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name">Nome Completo</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cpf">CPF</label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) =>
                      setFormData({ ...formData, cpf: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone">Telefone</label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address">Endereço</label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city">Cidade</label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="state">Estado</label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="zipCode">CEP</label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

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

              {paymentMethod === "credit" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dados do Cartão</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="cardNumber">Número do Cartão</label>
                      <Input
                        id="cardNumber"
                        value={creditCardData.cardNumber}
                        onChange={(e) =>
                          setCreditCardData({ ...creditCardData, cardNumber: e.target.value })
                        }
                        required={paymentMethod === "credit"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cardHolder">Nome no Cartão</label>
                      <Input
                        id="cardHolder"
                        value={creditCardData.cardHolder}
                        onChange={(e) =>
                          setCreditCardData({ ...creditCardData, cardHolder: e.target.value })
                        }
                        required={paymentMethod === "credit"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="expiryDate">Data de Validade</label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/AA"
                        value={creditCardData.expiryDate}
                        onChange={(e) =>
                          setCreditCardData({ ...creditCardData, expiryDate: e.target.value })
                        }
                        required={paymentMethod === "credit"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cvv">CVV</label>
                      <Input
                        id="cvv"
                        value={creditCardData.cvv}
                        onChange={(e) =>
                          setCreditCardData({ ...creditCardData, cvv: e.target.value })
                        }
                        required={paymentMethod === "credit"}
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">
                Finalizar Pedido
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}