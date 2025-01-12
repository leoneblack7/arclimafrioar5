import { Input } from "@/components/ui/input";

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
  return (
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
  );
}