interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity?: number;
}

export const sendTictoWebhookV2 = async (items: CartItem[], customerData?: any) => {
  try {
    const totalAmount = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    const payload = {
      payment_method: 'pix',
      total_amount: totalAmount,
      items: items.map(item => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity || 1
      })),
      customer: customerData || {},
      metadata: {
        source: 'arclimaFrio'
      }
    };

    const response = await fetch('https://webhook.ticto.dev/v2/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_TICTO_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Failed to send Ticto webhook:', await response.text());
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending Ticto webhook:', error);
    return null;
  }
};