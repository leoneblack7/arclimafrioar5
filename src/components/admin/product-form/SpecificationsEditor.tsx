import { Textarea } from "@/components/ui/textarea";

interface SpecificationsEditorProps {
  specifications: string;
  onSpecificationsChange: (specifications: string) => void;
}

export const SpecificationsEditor = ({
  specifications,
  onSpecificationsChange,
}: SpecificationsEditorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Especificações Técnicas</label>
      <Textarea
        value={specifications}
        onChange={(e) => onSpecificationsChange(e.target.value)}
        className="min-h-[200px] font-mono text-sm"
        placeholder="Cole aqui as especificações técnicas do produto..."
      />
    </div>
  );
};