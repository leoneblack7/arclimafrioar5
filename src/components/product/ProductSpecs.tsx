interface ProductSpecsProps {
  className?: string;
}

export function ProductSpecs({ className = "" }: ProductSpecsProps) {
  const specs = [
    {
      icon: "/lovable-uploads/810191c4-1c23-43e4-bf8b-05744be01e57.png",
      label: "INMETRO",
    },
    {
      icon: "/lovable-uploads/810191c4-1c23-43e4-bf8b-05744be01e57.png",
      label: "Ciclo",
    },
    {
      icon: "/lovable-uploads/810191c4-1c23-43e4-bf8b-05744be01e57.png",
      label: "220V",
    },
    {
      icon: "/lovable-uploads/810191c4-1c23-43e4-bf8b-05744be01e57.png",
      label: "Smart Wi-Fi",
    },
    {
      icon: "/lovable-uploads/810191c4-1c23-43e4-bf8b-05744be01e57.png",
      label: "Serpentina",
    },
  ];

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {specs.map((spec, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center bg-accent rounded-lg mb-2">
            <img src={spec.icon} alt={spec.label} className="w-8 h-8" />
          </div>
          <span className="text-xs text-gray-600">{spec.label}</span>
        </div>
      ))}
    </div>
  );
}