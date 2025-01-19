import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import axios from "axios";

export const MySQLConnectionManager = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

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

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="space-y-4 p-6 bg-card rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Conexão MySQL</h2>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span className={isConnected ? "text-green-500" : "text-red-500"}>
            {isConnected ? "Conectado" : "Desconectado"}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground">
          Status da conexão com o banco de dados MySQL
        </p>
        <Button 
          onClick={checkConnection} 
          disabled={isChecking}
          variant={isConnected ? "outline" : "default"}
        >
          {isChecking ? "Verificando..." : "Verificar Conexão"}
        </Button>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <p>Configurações atuais:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Host: localhost</li>
          <li>Database: arclimafrio</li>
          <li>User: root</li>
        </ul>
      </div>
    </div>
  );
};