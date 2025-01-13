interface ProductDetailDescriptionProps {
  description: string;
}

export const ProductDetailDescription = ({ description }: ProductDetailDescriptionProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Descrição do Produto</h2>
      <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
    </div>
  );
};