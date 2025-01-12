import { Button } from "../ui/button";
import { Trash2, Eye, EyeOff } from "lucide-react";

interface BannerCardProps {
  id: string;
  imageUrl: string;
  active: boolean;
  onToggleStatus: (id: string, newStatus: boolean) => void;
  onDelete: (id: string) => void;
}

export const BannerCard = ({ id, imageUrl, active, onToggleStatus, onDelete }: BannerCardProps) => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <img 
        src={imageUrl} 
        alt="Banner preview" 
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="flex justify-between items-center gap-2">
        <Button
          variant={active ? "secondary" : "default"}
          className="flex-1"
          onClick={() => onToggleStatus(id, !active)}
        >
          {active ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Desativar
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Ativar
            </>
          )}
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};