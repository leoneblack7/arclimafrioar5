import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { saveStoreSettings, getStoreSettings } from "@/utils/databaseService";

export const LogoManager = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [storeName, setStoreName] = useState("ArclimaFrio");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchStoreConfig();
  }, []);

  const fetchStoreConfig = async () => {
    try {
      const config = getStoreSettings();
      if (config) {
        if (config.logo_url) setLogoUrl(config.logo_url);
        if (config.store_name) setStoreName(config.store_name);
      }
    } catch (error) {
      console.error('Error fetching store config:', error);
      toast.error("Erro ao carregar configurações da loja");
    }
  };

  const handleSave = async () => {
    if (!logoUrl && !storeName) {
      toast.error("Por favor, insira um nome ou selecione uma logo");
      return;
    }

    try {
      saveStoreSettings({
        logo_url: logoUrl,
        store_name: storeName
      });
      toast.success("Configurações atualizadas com sucesso!");
    } catch (error) {
      console.error('Error saving store config:', error);
      toast.error("Erro ao salvar configurações");
    }
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
      <h2 className="text-2xl font-bold">Gerenciar Logo e Nome da Loja</h2>
      <div className="space-y-6 max-w-md">
        <div className="space-y-4">
          <Label>Nome da Loja</Label>
          <Input
            type="text"
            placeholder="Nome da loja"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

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

        <Button onClick={handleSave} className="w-full">
          Salvar Configurações
        </Button>
      </div>
      
      {(logoUrl || storeName) && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Prévia:</p>
          <div className="border border-gray-200 rounded-md p-4">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Logo preview" 
                className="max-w-[200px] h-auto" 
              />
            ) : (
              <p className="text-xl font-bold text-primary">{storeName}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};