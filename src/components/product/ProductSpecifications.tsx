interface ProductSpecificationsProps {
  className?: string;
}

export const ProductSpecifications = ({ className = "h-6" }: ProductSpecificationsProps) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <img
        src="/lovable-uploads/c251d96b-9a7a-489a-98a3-57ed17134b00.png"
        alt="Especificações do produto"
        className={`w-full object-contain ${className}`}
      />
    </div>
  );
};