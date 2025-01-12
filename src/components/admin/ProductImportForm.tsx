import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ProductScraperService } from "@/utils/ProductScraperService";

interface ProductImportFormProps {
  onImport: (product: any) => void;
}

export const ProductImportForm = ({ onImport }: ProductImportFormProps) => {
  const [importUrl, setImportUrl] = React.useState("");
  const [isImporting, setIsImporting] = React.useState(false);

  const handleImportProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsImporting(true);

    try {
      const scrapedProduct = await ProductScraperService.scrapeProduct(importUrl);
      
      if (scrapedProduct) {
        onImport(scrapedProduct);
        setImportUrl("");
        toast.success("Produto importado com sucesso!");
      }
    } catch (error) {
      console.error('Error importing product:', error);
      toast.error("Erro ao importar produto. Verifique o link e tente novamente.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Importar Produto</h3>
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