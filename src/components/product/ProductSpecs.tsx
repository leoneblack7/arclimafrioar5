interface ProductSpecsProps {
  className?: string;
  specifications?: string;
  isActive?: boolean;
}

export function ProductSpecs({ className = "", specifications, isActive }: ProductSpecsProps) {
  if (!isActive || !specifications) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-lg font-semibold">Especificações Técnicas</h2>
      <div className="whitespace-pre-wrap font-mono text-sm">
        {specifications}
      </div>
    </div>
  );
}