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
    console.log("API Key encontrada:", !!apiKey); // Log para debug

    if (!apiKey) {
      console.error("Chave API Ticto não encontrada. Por favor, configure a chave no painel administrativo.");
      throw new Error("Chave API Ticto não encontrada");
    }

    // Calcula o valor total baseado no preço e quantidade do item
    const totalAmount = items.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      return sum + (item.price * quantity);
    }, 0);

    console.log("Valor total calculado:", totalAmount); // Log para debug

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

    console.log('Enviando requisição para Ticto:', payload); // Log para debug

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
      throw new Error(`Erro na resposta Ticto: ${errorText}`);
    }

    const data = await response.json();
    console.log('Resposta Ticto:', data); // Log para debug
    return data;
  } catch (error) {
    console.error('Erro ao enviar webhook Ticto:', error);
    throw error; // Propaga o erro para ser tratado pelo componente
  }
};