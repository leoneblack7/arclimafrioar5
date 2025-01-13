import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface RelatedProductsEditorProps {
  relatedProductIds?: number[];
  isActive?: boolean;
  onRelatedProductsChange: (relatedProductIds: number[]) => void;
  onActiveChange: (isActive: boolean) => void;
}

export const RelatedProductsEditor = ({
  relatedProductIds = [],
  isActive = true,
  onRelatedProductsChange,
  onActiveChange,
}: RelatedProductsEditorProps) => {
  const [newProductId, setNewProductId] = useState("");

  const handleAddProduct = () => {
    if (newProductId && !isNaN(Number(newProductId))) {
      const updatedIds = [...relatedProductIds, Number(newProductId)];
      onRelatedProductsChange(updatedIds);
      setNewProductId("");
    }
  };

  const handleRemoveProduct = (idToRemove: number) => {
    const updatedIds = relatedProductIds.filter(id => id !== idToRemove);
    onRelatedProductsChange(updatedIds);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          Quem viu, também viu
        </label>
        <Switch
          checked={isActive}
          onCheckedChange={onActiveChange}
        />
      </div>

      {isActive && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Digite o código do produto"
              value={newProductId}
              onChange={(e) => setNewProductId(e.target.value)}
              type="number"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddProduct}
              className="shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {relatedProductIds.map((id) => (
              <div key={id} className="flex items-center gap-2 bg-secondary/50 p-2 rounded-md">
                <span className="text-sm flex-1">Código do produto: {id}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveProduct(id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};