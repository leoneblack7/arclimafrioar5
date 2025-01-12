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
          <Input
            placeholder="Insira sua chave API Ticto"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="password"
          />
        </div>
        <Button onClick={handleSave}>Salvar Chave API</Button>
      </div>
    </div>
  );
};