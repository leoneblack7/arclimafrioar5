interface ProductSpecsProps {
  className?: string;
}

export function ProductSpecs({ className = "" }: ProductSpecsProps) {
  const specs = [
    {
      icon: "/lovable-uploads/8f7ed58c-4de3-4626-a737-263fd2a13893.png",
      label: "Classificação INMETRO",
      code: "1234567"
    },
    {
      icon: "/lovable-uploads/8f7ed58c-4de3-4626-a737-263fd2a13893.png",
      label: "Ciclo",
      code: "7654321"
    },
    {
      icon: "/lovable-uploads/8f7ed58c-4de3-4626-a737-263fd2a13893.png",
      label: "220V",
      code: "9876543"
    },
    {
      icon: "/lovable-uploads/8f7ed58c-4de3-4626-a737-263fd2a13893.png",
      label: "Smart Wi-Fi",
      code: "8765432"
    },
    {
      icon: "/lovable-uploads/8f7ed58c-4de3-4626-a737-263fd2a13893.png",
      label: "Serpentina",
      code: "5432109"
    },
  ];

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {specs.map((spec, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center bg-accent rounded-lg mb-2">
            <img src={spec.icon} alt={spec.label} className="w-6 h-6" />
          </div>
          <span className="text-xs text-gray-600">{spec.label}</span>
          <span className="text-xs text-gray-500">{spec.code}</span>
        </div>
      ))}
    </div>
  );
}