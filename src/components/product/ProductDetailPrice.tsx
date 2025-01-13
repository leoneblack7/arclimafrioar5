interface ProductDetailPriceProps {
  price: number;
}

export const ProductDetailPrice = ({ price }: ProductDetailPriceProps) => {
  return (
    <div className="space-y-2">
      <div className="text-2xl md:text-3xl font-bold text-primary">
        {price.toLocaleString('pt-BR', { 
          style: 'currency', 
          currency: 'BRL' 
        })}
      </div>
      <p className="text-sm text-gray-500">
        Ou 12x de {(price / 12).toLocaleString('pt-BR', { 
          style: 'currency', 
          currency: 'BRL' 
        })} sem juros
      </p>
    </div>
  );
};