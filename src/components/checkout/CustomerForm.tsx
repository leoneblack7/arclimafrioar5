import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface CustomerFormData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CustomerFormProps {
  formData: CustomerFormData;
  setFormData: (data: CustomerFormData) => void;
}

export function CustomerForm({ formData, setFormData }: CustomerFormProps) {
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");
    
    if (allFieldsFilled && !isFormComplete) {
      setIsFormComplete(true);
      toast({
        title: "Entrega Grátis!",
        description: "Sua entrega será feita por transportadora sem custo adicional. Prazo estimado: 15 dias úteis.",
        duration: 5000,
      });
    }
  }, [formData, isFormComplete]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name">Nome Completo</label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="João Silva Santos"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="cpf">CPF</label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            placeholder="123.456.789-00"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="joao.silva@email.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone">Telefone</label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(11) 98765-4321"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="address">Endereço</label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Rua das Flores, 123"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="city">Cidade</label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="São Paulo"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="state">Estado</label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            placeholder="SP"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="zipCode">CEP</label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            placeholder="12345-678"
            required
          />
        </div>
      </div>
      {isFormComplete && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
          <p className="text-green-700 text-sm">
            ✨ Entrega grátis por transportadora! Prazo estimado: 15 dias úteis
          </p>
        </div>
      )}
    </div>
  );
}