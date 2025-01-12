import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ProductScraperService } from "@/utils/ProductScraperService";
import React, { useState } from 'react';

interface ProductImportFormProps {
  onImport: (product: any) => void;
}

export const ProductImportForm = ({ onImport }: ProductImportFormProps) => {
  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const handleImportProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!importUrl) {
      toast.error("Por favor, insira uma URL válida");
      return;
    }

    setIsImporting(true);
    console.log('Iniciando importação da URL:', importUrl);

    try {
      const scrapedProduct = await ProductScraperService.scrapeProduct(importUrl);
      
      if (scrapedProduct) {
        console.log('Produto importado com sucesso:', scrapedProduct);
        onImport(scrapedProduct);
        setImportUrl("");
        toast.success("Produto importado com sucesso!");
      } else {
        toast.error("Não foi possível importar o produto. Verifique a URL e tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao importar produto:', error);
      toast.error("Erro ao importar produto. Verifique o link e tente novamente.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-foreground">Importar Produto</h3>
      <form onSubmit={handleImportProduct} className="flex gap-4">
        <Input
          type="url"
          value={importUrl}
          onChange={(e) => setImportUrl(e.target.value)}
          placeholder="Cole o link do produto aqui"
          className="flex-1"
        />
        <Button type="submit" disabled={isImporting}>
          {isImporting ? "Importando..." : "Importar"}
        </Button>
      </form>
    </div>
  );
};