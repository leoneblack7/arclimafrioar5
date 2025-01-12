interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity?: number;
}

interface CustomerData {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
}

export const sendTictoWebhookV2 = async (items: CartItem[], customerData?: CustomerData) => {
  try {
    const apiKey = localStorage.getItem("TICTO_API_KEY");
    if (!apiKey) {
      console.error("Chave API Ticto não encontrada");
      return null;
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    const payload = {
      payment_method: 'pix',
      total_amount: totalAmount,
      items: items.map(item => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity || 1
      })),
      customer: {
        name: customerData?.name || '',
        email: customerData?.email || '',
        phone: customerData?.phone || '',
        document: customerData?.cpf || ''
      },
      metadata: {
        source: 'arclimaFrio'
      }
    };

    console.log('Enviando requisição para Ticto:', payload);

    const response = await fetch('https://webhook.ticto.dev/v2/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na resposta Ticto:', errorText);
      return null;
    }

    const data = await response.json();
    console.log('Resposta Ticto:', data);
    return data;
  } catch (error) {
    console.error('Erro ao enviar webhook Ticto:', error);
    return null;
  }
};