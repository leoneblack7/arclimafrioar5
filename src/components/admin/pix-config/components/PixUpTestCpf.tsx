import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PixUpTestCpfProps {
  testCpf: string;
  onCpfChange: (value: string) => void;
}

export const PixUpTestCpf = ({ testCpf, onCpfChange }: PixUpTestCpfProps) => {
  const handleChange = (value: string) => {
    // Remove tudo que não for número
    const cpfNumbers = value.replace(/\D/g, '');
    // Limita a 11 dígitos
    onCpfChange(cpfNumbers.slice(0, 11));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="test-cpf">CPF para Teste</Label>
      <Input
        id="test-cpf"
        value={testCpf}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Digite o CPF para teste (somente números)"
        maxLength={11}
      />
    </div>
  );
};