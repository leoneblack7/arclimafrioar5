import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DescriptionEditorProps {
  description: string;
  isActive: boolean;
  onDescriptionChange: (description: string) => void;
  onActiveChange: (active: boolean) => void;
}

export const DescriptionEditor = ({
  description,
  isActive,
  onDescriptionChange,
  onActiveChange,
}: DescriptionEditorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="description-active"
          checked={isActive}
          onCheckedChange={onActiveChange}
        />
        <Label htmlFor="description-active">Ativar Descrição</Label>
      </div>

      {isActive && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Descrição</label>
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          <div className="text-sm text-gray-500">
            A descrição suporta formatação HTML para melhor apresentação do produto.
          </div>
        </div>
      )}
    </div>
  );
};