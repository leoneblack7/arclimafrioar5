import { getFromLocalStorage } from "./localStorage";

interface CustomerData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity?: number;
}

export const sendTictoWebhookV2 = async (items: CartItem[], customerData: CustomerData) => {
  const apiKey = localStorage.getItem("TICTO_API_KEY");
  const pixConfig = getFromLocalStorage("PIX_CONFIG", null);

  console.log("Iniciando processamento do pagamento PIX");
  console.log("Itens:", items);
  console.log("Chave API:", apiKey ? "Presente" : "Ausente");
  console.log("Configuração PIX:", pixConfig);

  if (!apiKey) {
    throw new Error("Chave API Ticto não encontrada. Configure a chave no painel administrativo.");
  }

  if (!pixConfig?.enabled) {
    throw new Error("Integração PIX está desativada. Ative-a no painel administrativo.");
  }

  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const payload: any = {
    customer: {
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      document: customerData.cpf,
    },
    total_amount: total,
    payment_method: "pix",
  };

  if (pixConfig.useCustomKeys) {
    payload.pix_config = {
      key: pixConfig.pixKey,
      name: pixConfig.pixName,
      city: pixConfig.pixCity,
    };
  }

  try {
    const response = await fetch("https://api.ticto.com.br/v2/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao processar pagamento");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};