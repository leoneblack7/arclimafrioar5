interface BannerIndicatorsProps {
  count: number;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const BannerIndicators = ({ count, currentIndex, onSelect }: BannerIndicatorsProps) => {
  return (
    <div className="hidden">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentIndex === index
              ? 'bg-white/80 scale-110'
              : 'bg-white/50 hover:bg-white/70'
          }`}
          aria-label={`Ir para slide ${index + 1}`}
        />
      ))}
    </div>
  );
};