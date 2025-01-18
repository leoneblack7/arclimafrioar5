import React from 'react';

export interface PaymentMethodSelectorProps {
  onChange: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ onChange }) => {
  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="payment-method" className="block text-sm font-medium">
        Método de Pagamento
      </label>
      <select
        id="payment-method"
        onChange={handleMethodChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      >
        <option value="credit_card">Cartão de Crédito</option>
        <option value="pix">PIX</option>
        <option value="boleto">Boleto</option>
      </select>
    </div>
  );
};

export default PaymentMethodSelector;