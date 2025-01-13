import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SpecificationsEditorProps {
  specifications: string;
  isActive: boolean;
  onSpecificationsChange: (specifications: string) => void;
  onActiveChange: (active: boolean) => void;
}

export const SpecificationsEditor = ({
  specifications,
  isActive,
  onSpecificationsChange,
  onActiveChange,
}: SpecificationsEditorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Especificações Técnicas</label>
        <div className="flex items-center space-x-2">
          <Switch
            id="specifications-active"
            checked={isActive}
            onCheckedChange={onActiveChange}
          />
          <Label htmlFor="specifications-active">Ativar Especificações</Label>
        </div>
      </div>

      {isActive && (
        <div className="space-y-2">
          <Textarea
            value={specifications}
            onChange={(e) => onSpecificationsChange(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
            placeholder="Cole aqui as especificações técnicas do produto..."
          />
        </div>
      )}
    </div>
  );
};