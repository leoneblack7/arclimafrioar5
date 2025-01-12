import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export const LogoManager = () => {
  const [logoUrl, setLogoUrl] = useState("");

  const handleSaveLogo = () => {
    // In a real application, this would save to a backend
    localStorage.setItem("storeLogoUrl", logoUrl);
    toast.success("Logo atualizada com sucesso!");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Gerenciar Logo</h2>
      <div className="space-y-4 max-w-md">
        <Input
          type="url"
          placeholder="URL da logo"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
        />
        <Button onClick={handleSaveLogo}>Salvar Logo</Button>
      </div>
      {logoUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Prévia:</p>
          <img src={logoUrl} alt="Logo preview" className="max-w-[200px] h-auto" />
        </div>
      )}
    </div>
  );
};