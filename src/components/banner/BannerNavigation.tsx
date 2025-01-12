import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerNavigationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  showControls: boolean;
}

export const BannerNavigation = ({ onPrevClick, onNextClick, showControls }: BannerNavigationProps) => {
  if (!showControls) return null;

  return (
    <>
      <button
        onClick={onPrevClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={onNextClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </>
  );
};