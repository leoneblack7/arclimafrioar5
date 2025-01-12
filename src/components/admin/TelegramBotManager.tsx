import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

export function TelegramBotManager() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedConfig = getFromLocalStorage("telegramConfig", {
      isEnabled: false,
      botToken: "",
      chatId: "",
    });
    setIsEnabled(savedConfig.isEnabled);
    setBotToken(savedConfig.botToken);
    setChatId(savedConfig.chatId);
  }, []);

  const handleSave = () => {
    if (isEnabled && (!botToken || !chatId)) {
      toast({
        title: "Erro ao salvar configurações",
        description: "Por favor, preencha todos os campos necessários",
        variant: "destructive",
      });
      return;
    }

    const config = {
      isEnabled,
      botToken,
      chatId,
    };

    saveToLocalStorage("telegramConfig", config);

    toast({
      title: "Configurações salvas com sucesso!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Bot Telegram</CardTitle>
        <CardDescription>
          Configure as notificações do Telegram para pedidos com cartão de crédito
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-medium">Ativar Notificações</h3>
            <p className="text-sm text-muted-foreground">
              Receba notificações de pedidos com cartão no Telegram
            </p>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
        </div>

        {isEnabled && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="botToken" className="text-sm font-medium">
                Token do Bot
              </label>
              <Input
                id="botToken"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                placeholder="Digite o token do seu bot"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="chatId" className="text-sm font-medium">
                ID do Chat
              </label>
              <Input
                id="chatId"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                placeholder="Digite o ID do chat"
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              Salvar Configurações
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}