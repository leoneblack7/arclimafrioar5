import { getFromStorage } from './storage';

export const sendTictoWebhookV2 = async (items: any[], customerData: any) => {
  try {
    const config = await getFromStorage('ticto-config', {});
    const { apiKey } = config;

    if (!apiKey) {
      throw new Error('Ticto API key not found');
    }

    // Format the data according to Ticto's requirements
    const formattedData = {
      items: items.map(item => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      customer: {
        name: customerData.name,
        document: customerData.cpf,
        email: customerData.email,
        phone: customerData.phone
      }
    };

    const response = await fetch('https://api.ticto.com.br/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(formattedData)
    });

    if (!response.ok) {
      throw new Error('Failed to create Ticto payment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Ticto payment:', error);
    throw error;
  }
};