import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2, Database } from "lucide-react";
import axios from "axios";

interface MySQLConfig {
  host: string;
  database: string;
  username: string;
  password: string;
  port: string;
}

export const MySQLConnectionManager = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [config, setConfig] = useState<MySQLConfig>({
    host: 'localhost',
    database: 'arclimafrio',
    username: 'root',
    password: '',
    port: '3306'
  });

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get('/api/config/check-connection.php');
      setIsConnected(response.data.connected);
      if (response.data.connected) {
        toast.success("MySQL está conectado!");
      } else {
        toast.error("MySQL não está conectado. Verifique as configurações.");
      }
    } catch (error) {
      setIsConnected(false);
      toast.error("Erro ao verificar conexão com MySQL");
    } finally {
      setIsChecking(false);
    }
  };

  const saveConfig = async () => {
    setIsSaving(true);
    try {
      const response = await axios.post('/api/config/save-mysql-config.php', config);
      if (response.data.success) {
        toast.success("Configurações do MySQL salvas com sucesso!");
        checkConnection();
      } else {
        toast.error("Erro ao salvar configurações do MySQL");
      }
    } catch (error) {
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  };

  const loadConfig = async () => {
    try {
      const response = await axios.get('/api/config/get-mysql-config.php');
      if (response.data) {
        setConfig(response.data);
      }
    } catch (error) {
      console.error('Error loading MySQL config:', error);
    }
  };

  useEffect(() => {
    loadConfig();
    checkConnection();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-6 bg-card rounded-lg border border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="w-6 h-6" />
            Conexão MySQL
          </h2>
          <div className="flex items-center gap-2 text-sm">
            {isConnected ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Conectado</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-500">Desconectado</span>
              </>
            )}
          </div>
        </div>
        <Button 
          onClick={checkConnection} 
          disabled={isChecking}
          variant={isConnected ? "outline" : "default"}
        >
          {isChecking ? "Verificando..." : "Verificar Conexão"}
        </Button>
      </div>

      <div className="grid gap-6 p-6 bg-card rounded-lg border border-border">
        <h3 className="text-lg font-semibold">Configurações de Conexão</h3>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="host">Host</Label>
            <Input
              id="host"
              value={config.host}
              onChange={(e) => setConfig({ ...config, host: e.target.value })}
              placeholder="localhost"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="port">Porta</Label>
            <Input
              id="port"
              value={config.port}
              onChange={(e) => setConfig({ ...config, port: e.target.value })}
              placeholder="3306"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="database">Nome do Banco</Label>
            <Input
              id="database"
              value={config.database}
              onChange={(e) => setConfig({ ...config, database: e.target.value })}
              placeholder="arclimafrio"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              value={config.username}
              onChange={(e) => setConfig({ ...config, username: e.target.value })}
              placeholder="root"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={config.password}
              onChange={(e) => setConfig({ ...config, password: e.target.value })}
              placeholder="Digite a senha do MySQL"
            />
          </div>
        </div>

        <Button onClick={saveConfig} disabled={isSaving} className="w-full">
          {isSaving ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        <p className="font-semibold mb-2">Dicas de Conexão:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Para XAMPP: Use localhost como host e root como usuário (senha geralmente vazia)</li>
          <li>Para aapanel: Use o host do seu servidor e as credenciais fornecidas</li>
          <li>A porta padrão do MySQL é 3306</li>
          <li>Certifique-se que o servidor MySQL está rodando antes de testar a conexão</li>
        </ul>
      </div>
    </div>
  );
};