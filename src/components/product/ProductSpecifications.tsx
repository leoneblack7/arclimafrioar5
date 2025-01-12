interface ProductSpecificationsProps {
  className?: string;
}

export const ProductSpecifications = ({ className = "h-6" }: ProductSpecificationsProps) => {
  return (
    <div className="flex justify-between items-center gap-2 border-t pt-3">
      <img
        src="/lovable-uploads/5275c902-4f65-478a-847b-67042b1e63c6.png"
        alt="Especificações do produto"
        className={`w-full object-contain ${className}`}
      />
    </div>
  );
};