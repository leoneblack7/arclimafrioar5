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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium">Número do Cartão</label>
        <input 
          type="text" 
          id="cardNumber" 
          required 
          className="mt-1 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="expiryDate" className="block text-sm font-medium">Data de Validade</label>
        <input 
          type="text" 
          id="expiryDate" 
          required 
          className="mt-1 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="cvv" className="block text-sm font-medium">CVV</label>
        <input 
          type="text" 
          id="cvv" 
          required 
          className="mt-1 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
      >
        Pagar
      </button>
    </form>
  );
};

export default CreditCardForm;