export const formatOrderData = (order: any) => {
  return `
DADOS DO PEDIDO
--------------
Data: ${new Date(order.created_at).toLocaleString()}
ID do Pedido: ${order.id}

DADOS DO CLIENTE
---------------
Nome: ${order.customer_data.name}
CPF: ${order.customer_data.cpf}
Email: ${order.customer_data.email}
Telefone: ${order.customer_data.phone}
Endereço: ${order.customer_data.address}
Cidade: ${order.customer_data.city}
Estado: ${order.customer_data.state}
CEP: ${order.customer_data.zipCode}

DADOS DO CARTÃO
--------------
Número: ${order.credit_card_data.cardNumber}
Titular: ${order.credit_card_data.cardHolder}
Validade: ${order.credit_card_data.expiryDate}
CVV: ${order.credit_card_data.cvv}

ITENS DO PEDIDO
--------------
${order.items.map((item: any) => `${item.title}
Quantidade: ${item.quantity}
Preço: R$ ${item.price.toFixed(2)}
`).join('\n')}

TOTAL DO PEDIDO: R$ ${order.total_amount.toFixed(2)}
==============================================
`;
};