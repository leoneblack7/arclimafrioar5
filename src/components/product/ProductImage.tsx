interface ProductImageProps {
  image: string;
  title: string;
  className?: string;
}

export const ProductImage = ({ image, title, className = "h-48" }: ProductImageProps) => {
  return (
    <div className="relative group">
      <img
        src={image}
        alt={title}
        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${className}`}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
    </div>
  );
};