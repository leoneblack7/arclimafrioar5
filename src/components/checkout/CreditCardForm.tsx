import React from 'react';

export interface CreditCardFormProps {
  onComplete: () => Promise<void>;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onComplete }) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cardNumber">Número do Cartão</label>
        <input type="text" id="cardNumber" required />
      </div>
      <div>
        <label htmlFor="expiryDate">Data de Validade</label>
        <input type="text" id="expiryDate" required />
      </div>
      <div>
        <label htmlFor="cvv">CVV</label>
        <input type="text" id="cvv" required />
      </div>
      <button type="submit">Pagar</button>
    </form>
  );
};

export default CreditCardForm;
