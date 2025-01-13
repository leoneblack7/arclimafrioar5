export const generateOrderId = (cardNumber?: string) => {
  if (cardNumber) {
    // Gera ID baseado nos últimos 4 dígitos do cartão + timestamp
    const lastFourDigits = cardNumber.slice(-4);
    return `CC-${lastFourDigits}-${Date.now()}`;
  }
  // Para outros métodos de pagamento
  return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};