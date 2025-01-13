interface ProductDetailDescriptionProps {
  description: string;
  isActive?: boolean;
}

export const ProductDetailDescription = ({ 
  description, 
  isActive = true 
}: ProductDetailDescriptionProps) => {
  if (!isActive) return null;
  
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Descrição do Produto</h2>
      <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
    </div>
  );
};