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
    <div className="border rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Produto de qualidade</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {images.map((image, index) => (
          <div key={index} className="w-full flex items-center justify-center">
            <img
              src={image}
              alt={`${title} - Imagem ${index + 1}`}
              className="w-full h-auto object-contain rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};