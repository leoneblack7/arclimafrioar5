import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PixApiKeySectionProps {
  tictoApiKey: string;
  onTictoApiKeyChange: (value: string) => void;
}

export const PixApiKeySection = ({
  tictoApiKey,
  onTictoApiKeyChange,
}: PixApiKeySectionProps) => {
  const handleSaveTictoKey = () => {
    if (!tictoApiKey.trim()) {
      toast.error("Por favor, insira uma chave API válida");
      return;
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(tictoApiKey.trim())) {
      toast.error("Por favor, insira uma chave API válida no formato correto");
      return;
    }

    localStorage.setItem("TICTO_API_KEY", tictoApiKey.trim());
    toast.success("Chave API Ticto salva com sucesso!");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Chave API Ticto</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          Insira sua chave API Ticto no formato UUID (exemplo: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
        </p>
        <Input
          placeholder="9dd5fb2f-f1c7-432e-ba5c-32b53725cc44"
          value={tictoApiKey}
          onChange={(e) => onTictoApiKeyChange(e.target.value)}
          type="text"
        />
        <Button onClick={handleSaveTictoKey} variant="outline" className="mt-2">
          Salvar Chave API
        </Button>
      </div>
    </div>
  );
};