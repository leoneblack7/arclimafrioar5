interface ProductDetailImagesProps {
  title: string;
  images: string[];
  isActive?: boolean;
}

export const ProductDetailImages = ({ title, images, isActive }: ProductDetailImagesProps) => {
  if (!isActive || !images || images.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} - Imagem ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </div>
  );
};