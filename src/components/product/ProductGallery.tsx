import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  // If no images are provided, use an empty array to prevent errors
  const imageArray = images?.length > 0 ? images : [];
  
  // Show only 4 thumbnails at a time
  const visibleThumbnails = imageArray.slice(startIndex, startIndex + 4);
  const hasMoreUp = startIndex > 0;
  const hasMoreDown = startIndex + 4 < imageArray.length;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {hasMoreUp && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStartIndex(startIndex - 1)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        )}
        
        {visibleThumbnails.map((image, index) => (
          <button
            key={index}
            className={`w-20 h-20 border rounded-lg overflow-hidden ${
              selectedImage === index + startIndex ? "border-primary" : "border-gray-200"
            }`}
            onClick={() => setSelectedImage(index + startIndex)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}

        {hasMoreDown && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStartIndex(startIndex + 1)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex-1">
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={imageArray[selectedImage] || imageArray[0]}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}