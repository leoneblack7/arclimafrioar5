interface BannerSlideProps {
  id: string;
  image_url: string;
  isActive: boolean;
}

export const BannerSlide = ({ id, image_url, isActive }: BannerSlideProps) => {
  return (
    <div
      key={id}
      className={`absolute w-full h-full transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
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