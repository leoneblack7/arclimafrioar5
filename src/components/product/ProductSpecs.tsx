interface ProductSpecsProps {
  className?: string;
}

export function ProductSpecs({ className = "" }: ProductSpecsProps) {
  const specs = [
    {
      icon: "/lovable-uploads/11bed4e5-4a54-43ce-a386-d5c74e571444.png",
      label: "INMETRO",
    },
    {
      icon: "/lovable-uploads/11bed4e5-4a54-43ce-a386-d5c74e571444.png",
      label: "Ciclo",
    },
    {
      icon: "/lovable-uploads/11bed4e5-4a54-43ce-a386-d5c74e571444.png",
      label: "220V",
    },
    {
      icon: "/lovable-uploads/11bed4e5-4a54-43ce-a386-d5c74e571444.png",
      label: "Smart Wi-Fi",
    },
    {
      icon: "/lovable-uploads/11bed4e5-4a54-43ce-a386-d5c74e571444.png",
      label: "Serpentina",
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
        </div>
      ))}
    </div>
  );
}