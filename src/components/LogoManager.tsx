import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Label } from "./ui/label";

export const LogoManager = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [storeName, setStoreName] = useState("ArclimaFrio");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchStoreConfig();
  }, []);

  const fetchStoreConfig = async () => {
    try {
      const response = await fetch('api/store-config/read.php');
      if (response.ok) {
        const data = await response.json();
        if (data.logo_url) setLogoUrl(data.logo_url);
        if (data.store_name) setStoreName(data.store_name);
      }
    } catch (error) {
      console.error('Error fetching store config:', error);
      // Fallback to localStorage
      const savedLogo = localStorage.getItem("storeLogoUrl");
      const savedName = localStorage.getItem("storeName");
      if (savedLogo) setLogoUrl(savedLogo);
      if (savedName) setStoreName(savedName);
    }
  };

  const handleSave = async () => {
    if (!logoUrl && !storeName) {
      toast.error("Por favor, insira um nome ou selecione uma logo");
      return;
    }

    try {
      const response = await fetch('api/store-config/update.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logo_url: logoUrl,
          store_name: storeName
        })
      });

      if (response.ok) {
        // Backup em localStorage
        localStorage.setItem("storeLogoUrl", logoUrl);
        localStorage.setItem("storeName", storeName);
        toast.success("Configurações atualizadas com sucesso!");
      } else {
        throw new Error('Falha ao atualizar configurações');
      }
    } catch (error) {
      console.error('Error saving store config:', error);
      toast.error("Erro ao salvar configurações. Tentando salvar localmente...");
      // Fallback para localStorage
      localStorage.setItem("storeLogoUrl", logoUrl);
      localStorage.setItem("storeName", storeName);
      toast.success("Configurações salvas localmente!");
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