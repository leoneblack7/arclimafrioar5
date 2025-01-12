interface BannerIndicatorsProps {
  count: number;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const BannerIndicators = ({ count, currentIndex, onSelect }: BannerIndicatorsProps) => {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 bg-black/20 py-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentIndex === index
              ? 'bg-white scale-110'
              : 'bg-white/50 hover:bg-white/70'
          }`}
          aria-label={`Ir para slide ${index + 1}`}
        />
      ))}
    </div>
  );
};