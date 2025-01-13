import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PixConfig } from "@/types/pix";

interface PixUpApiKeysProps {
  config: PixConfig;
  onClientIdChange: (value: string) => void;
  onClientSecretChange: (value: string) => void;
}

export const PixUpApiKeys = ({
  config,
  onClientIdChange,
  onClientSecretChange,
}: PixUpApiKeysProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="pixup-client-id">Client ID</Label>
        <Input
          id="pixup-client-id"
          value={config.pixUpClientId || ""}
          onChange={(e) => onClientIdChange(e.target.value)}
          placeholder="Insira seu Client ID do PixUp"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pixup-client-secret">Client Secret</Label>
        <Input
          id="pixup-client-secret"
          type="password"
          value={config.pixUpClientSecret || ""}
          onChange={(e) => onClientSecretChange(e.target.value)}
          placeholder="Insira seu Client Secret do PixUp"
        />
      </div>
    </>
  );
};