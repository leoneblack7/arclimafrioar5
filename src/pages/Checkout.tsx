import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const orderData = {
        customer_data: formData,
        items: items,
        total_amount: total,
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full">
                Continuar para Pagamento
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}