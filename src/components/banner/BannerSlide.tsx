interface BannerSlideProps {
  id: string;
  image_url: string;
  isActive: boolean;
  direction: 'left' | 'right';
}

export const BannerSlide = ({ id, image_url, isActive, direction }: BannerSlideProps) => {
  return (
    <div
      key={id}
      className={`absolute inset-0 transition-all duration-500 ${
        isActive 
          ? 'opacity-100 translate-x-0' 
          : direction === 'right'
          ? 'opacity-0 translate-x-full'
          : 'opacity-0 -translate-x-full'
      }`}
    >
      <img
        src={image_url}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};