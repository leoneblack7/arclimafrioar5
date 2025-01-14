import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PermissionsManager() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Comando copiado!",
      description: "O comando foi copiado para sua área de transferência.",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Permissões</h2>
        <p className="text-muted-foreground mb-6">
          Configure as permissões necessárias para o funcionamento do sistema
        </p>

        <div className="space-y-6">
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Comandos de Permissão
            </h3>
            
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Pasta data e arquivos principais:</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("chmod -R 777 data/")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
                <code className="text-sm bg-background/50 p-2 rounded block">
                  chmod -R 777 data/
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Este comando dará permissão total para a pasta data e seus arquivos
                </p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Arquivos JSON principais:</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`chmod 777 data/products.json
chmod 777 data/orders.json
chmod 777 data/banners.json
chmod 777 data/stats.json
chmod 777 data/users.json`)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
                <code className="text-sm bg-background/50 p-2 rounded block whitespace-pre">
chmod 777 data/products.json
chmod 777 data/orders.json
chmod 777 data/banners.json
chmod 777 data/stats.json
chmod 777 data/users.json
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Estes comandos garantem permissões para os arquivos JSON principais
                </p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Pastas de pedidos e backups:</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`chmod -R 777 data/orders/
chmod -R 777 data/cdbcc/`)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
                <code className="text-sm bg-background/50 p-2 rounded block whitespace-pre">
chmod -R 777 data/orders/
chmod -R 777 data/cdbcc/
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Estes comandos configuram as permissões para as pastas de pedidos e backups
                </p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Pasta de uploads:</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("chmod -R 777 lovable-uploads/")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
                <code className="text-sm bg-background/50 p-2 rounded block">
                  chmod -R 777 lovable-uploads/
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Este comando configura as permissões para a pasta de uploads de imagens
                </p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Verificar permissões atuais:</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("ls -la data/")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
                <code className="text-sm bg-background/50 p-2 rounded block">
                  ls -la data/
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Este comando mostrará as permissões atuais dos arquivos e pastas
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}