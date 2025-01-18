import { useEffect, useState } from 'react';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import { TelegramConfig } from '@/types/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const TelegramBotManager = () => {
  const [config, setConfig] = useState<TelegramConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');

  useEffect(() => {
    const loadConfig = async () => {
      const storedConfig = await getFromStorage<TelegramConfig>('telegram_config', null);
      if (storedConfig) {
        setConfig(storedConfig);
        setBotToken(storedConfig.botToken);
        setChatId(storedConfig.chatId);
      }
      setLoading(false);
    };

    loadConfig();
  }, []);

  const handleSave = async () => {
    const newConfig: TelegramConfig = { botToken, chatId };
    await saveToStorage('telegram_config', newConfig);
    setConfig(newConfig);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Telegram Bot Configuration</h2>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium">Bot Token</label>
          <Input
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            placeholder="Enter your bot token"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Chat ID</label>
          <Input
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            placeholder="Enter your chat ID"
          />
        </div>
      </div>
      <Button onClick={handleSave}>Save Configuration</Button>
    </div>
  );
};
