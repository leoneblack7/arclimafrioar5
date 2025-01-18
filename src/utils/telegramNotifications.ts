import { getFromStorage } from './storage';

export const sendTelegramNotification = async (message: string) => {
  try {
    const config = await getFromStorage('telegram-config', {});
    const { botToken, chatId } = config;

    if (!botToken || !chatId) {
      console.error('Telegram configuration not found');
      return;
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Telegram notification');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
};