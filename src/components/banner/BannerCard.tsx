import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface BannerCardProps {
  id: string;
  imageUrl: string;
  active: boolean;
  onToggleStatus: (id: string, status: boolean) => void;
  onDelete: (id: string) => void;
  onUpdateUrl?: (id: string, newUrl: string) => void;
}

export const BannerCard = ({
  id,
  imageUrl,
  active,
  onToggleStatus,
  onDelete,
  onUpdateUrl
}: BannerCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(imageUrl);
  const isDefaultBanner = id.startsWith('default-banner-');

  const handleUpdateUrl = () => {
    if (onUpdateUrl && newUrl !== imageUrl) {
      onUpdateUrl(id, newUrl);
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div className="relative aspect-video">
        <img
          src={imageUrl}
          alt="Banner"
          className="w-full h-full object-cover rounded-md"
          onClick={() => setIsEditing(true)}
        />
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Nova URL da imagem"
          />
          <div className="flex gap-2">
            <Button onClick={handleUpdateUrl} className="flex-1">
              Salvar
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setNewUrl(imageUrl);
                setIsEditing(false);
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={active}
              onCheckedChange={(checked) => onToggleStatus(id, checked)}
            />
            <span className="text-sm text-gray-500">
              {active ? "Ativo" : "Inativo"}
            </span>
          </div>
          {!isDefaultBanner && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};