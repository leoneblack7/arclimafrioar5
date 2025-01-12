import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const TictoKeyManager = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("TICTO_API_KEY");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Por favor, insira uma chave API válida");
      return;
    }

    // Validar se a chave tem o formato correto (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(apiKey.trim())) {
      toast.error("Por favor, insira uma chave API válida no formato correto");
      return;
    }

    localStorage.setItem("TICTO_API_KEY", apiKey.trim());
    toast.success("Chave API Ticto salva com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciar Chave API Ticto</h2>
      </div>

      <div className="grid gap-4 max-w-xl">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Insira sua chave API Ticto no formato UUID (exemplo: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
          </p>
          <Input
            placeholder="9dd5fb2f-f1c7-432e-ba5c-32b53725cc44"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="text"
          />
        </div>
        <Button onClick={handleSave}>Salvar Chave API</Button>
      </div>
    </div>
  );
};