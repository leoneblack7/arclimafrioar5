import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const ProductDetailShipping = () => {
  const [cep, setCep] = useState("");

  const handleCalculateShipping = () => {
    if (cep.length < 8) {
      toast.error("Digite um CEP válido");
      return;
    }
    toast.success("Frete calculado com sucesso!");
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <p className="text-sm font-medium">Calcule o valor do Frete e Prazo de entrega</p>
      <div className="flex gap-2">
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          maxLength={8}
          className="flex-1"
        />
        <Button variant="outline" onClick={handleCalculateShipping}>
          Calcular
        </Button>
      </div>
      {cep.length === 8 && (
        <div className="text-sm space-y-1">
          <p className="text-green-600 font-medium">✓ Frete Grátis</p>
          <p className="text-gray-600">Prazo de entrega: 15 dias úteis</p>
        </div>
      )}
    </div>
  );
};