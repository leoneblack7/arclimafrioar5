import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Label } from "./ui/label";

export const LogoManager = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveLogo = () => {
    if (!logoUrl) {
      toast.error("Por favor, selecione uma imagem ou insira uma URL");
      return;
    }
    localStorage.setItem("storeLogoUrl", logoUrl);
    toast.success("Logo atualizada com sucesso!");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Gerenciar Logo</h2>
      <div className="space-y-6 max-w-md">
        <div className="space-y-4">
          <Label>Upload do dispositivo</Label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button onClick={handleClickUpload} className="w-full">
            Escolher arquivo
          </Button>
        </div>

        <div className="space-y-4">
          <Label>Ou cole o link da imagem</Label>
          <Input
            type="url"
            placeholder="URL da logo"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </div>

        <Button onClick={handleSaveLogo} className="w-full">
          Salvar Logo
        </Button>
      </div>
      
      {logoUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Prévia:</p>
          <img 
            src={logoUrl} 
            alt="Logo preview" 
            className="max-w-[200px] h-auto border border-gray-200 rounded-md p-2" 
          />
        </div>
      )}
    </div>
  );
};