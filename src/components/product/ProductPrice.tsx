interface ProductPriceProps {
  price: number;
  showStock?: boolean;
  className?: string;
}

export const ProductPrice = ({ price, showStock = true, className = "mb-3" }: ProductPriceProps) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className="text-primary font-bold text-xl">
        {price.toLocaleString('pt-BR', { 
          style: 'currency', 
          currency: 'BRL' 
        })}
      </p>
      {showStock && <span className="text-sm text-green-600">Em estoque</span>}
    </div>
  );
};