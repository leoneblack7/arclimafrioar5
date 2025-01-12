interface ProductSpecificationsProps {
  className?: string;
}

export const ProductSpecifications = ({ className = "h-6" }: ProductSpecificationsProps) => {
  return (
    <div className="flex justify-between items-center gap-2 border-t pt-3">
      <img
        src="/lovable-uploads/1358e50a-d563-4d1e-b6ab-78515801abdb.png"
        alt="Especificações do produto"
        className={`w-full object-contain ${className}`}
      />
    </div>
  );
};