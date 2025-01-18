import axios from 'axios';
import { getFromStorage } from '@/utils/storage';

const API_URL = '/api';

export const sendTelegramNotification = async (message: string) => {
  const config = await getFromStorage('telegram_config', null);
  if (!config) {
    console.error('Telegram configuration not found');
    return;
  }

  const { botToken, chatId } = config;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
};
