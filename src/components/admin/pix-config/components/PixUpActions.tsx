import { Button } from "@/components/ui/button";

interface PixUpActionsProps {
  onTestConnection: () => void;
  onGenerateTestPix: () => void;
}

export const PixUpActions = ({
  onTestConnection,
  onGenerateTestPix,
}: PixUpActionsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Button 
        variant="outline" 
        onClick={onTestConnection}
        className="w-full"
      >
        Testar Conexão
      </Button>
      <Button 
        variant="default" 
        onClick={onGenerateTestPix}
        className="w-full"
      >
        Gerar PIX de Teste (R$ 50,00)
      </Button>
    </div>
  );
};