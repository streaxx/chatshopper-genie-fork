import React, { useState } from "react";
import { Heart, Star, ShoppingCart, Clock } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  type: "sample" | "exa";
  availability: "in-stock" | "low-stock" | "out-of-stock";
  onSelect: () => void;
  onBuy: () => void;
  url?: string; // Add URL for Exa results
}

const ProductCard = ({
  image,
  name,
  price,
  rating,
  description,
  type,
  availability,
  url,
  onSelect,
  onBuy,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Added to cart!");
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "Removed from wishlist!" : "Added to wishlist!",
    );
  };
  console.log(url)

  return (
    <div
      onClick={onSelect}
      className="relative group max-w-fit rounded-xl overflow-hidden transition-all duration-300 cursor-pointer animate-fade-in"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-metallic-light via-metallic to-metallic-dark opacity-90 backdrop-blur-sm border border-white/50 shadow-lg bg-noise" />

      <div className="relative p-4">
        <div className="relative h-48 overflow-hidden rounded-lg">
          <img
            src={image}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {type === "sample" && (
            <button
              className={`absolute top-2 right-2 p-2.5 rounded-full transition-all duration-300 ${
                isWishlisted
                  ? "bg-accent text-white"
                  : "bg-white/70 hover:bg-white text-gray-700 hover:text-accent"
              } backdrop-blur-sm shadow-lg`}
              onClick={handleAddToWishlist}
            >
              <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
            </button>
          )}
        </div>

        <div className="relative space-y-3 mt-4">
          {type === "sample" ? (
            <>
              <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-sm text-gray-600">{rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  ${price.toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <button
                    className="flex items-center space-x-1 p-2 bg-primary/80 text-white rounded-full text-sm hover:bg-primary transition-colors backdrop-blur-sm shadow-lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={16} />
                  </button>
                  <button
                    className="flex items-center space-x-1 px-4 py-2 bg-accent/90 text-white rounded-full text-sm hover:bg-accent transition-colors backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onBuy}
                    disabled={availability === "out-of-stock"}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {description}
              </p>
              <div className="flex flex-col items-center gap-2">
                <a
                  href={url}
                  className="w-full px-4 py-2 bg-primary/80 text-white rounded-full text-sm hover:bg-primary transition-colors backdrop-blur-sm shadow-lg"
                >
                  Visit Site to Buy
                </a>
                <span className="text-xs text-gray-500 italic">
                  Prava integration coming soon
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
