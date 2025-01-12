import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TictoKeyManager() {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem("TICTO_API_KEY");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("TICTO_API_KEY", apiKey);
    toast({
      title: "Chave API Ticto",
      description: "Chave API salva com sucesso!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração API Ticto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="apiKey" className="text-sm font-medium">
            Chave API Ticto
          </label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Cole sua chave API aqui"
          />
        </div>
        <Button onClick={handleSave}>Salvar Chave API</Button>
      </CardContent>
    </Card>
  );
}