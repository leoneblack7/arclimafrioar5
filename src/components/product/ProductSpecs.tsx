interface ProductSpecsProps {
  className?: string;
}

export function ProductSpecs({ className = "" }: ProductSpecsProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img
        src="/lovable-uploads/5275c902-4f65-478a-847b-67042b1e63c6.png"
        alt="Especificações do produto"
        className="w-full max-w-md object-contain"
      />
    </div>
  );
}