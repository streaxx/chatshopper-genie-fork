import React, { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  onSelect: () => void;
  onBuy: () => void;
}

const ProductCard = ({ image, name, price, rating, description, onSelect, onBuy }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist!' : 'Added to wishlist!', {
      position: 'bottom-right',
    });
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuy();
  };

  return (
    <div 
      onClick={onSelect}
      className="relative group w-72 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer animate-fade-in"
    >
      {/* Metallic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-gray-100/90 to-gray-200/80 backdrop-blur-md border border-white/50 shadow-lg" />
      
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <button 
            className={`absolute top-2 right-2 p-2.5 rounded-full transition-all duration-300 ${
              isWishlisted 
                ? 'bg-accent text-white' 
                : 'bg-white/70 hover:bg-white text-gray-700 hover:text-accent'
            } backdrop-blur-sm`}
            onClick={handleAddToWishlist}
          >
            <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
          </button>
        </div>
        
        <div className="relative p-4 space-y-3">
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-lg bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              ${price.toFixed(2)}
            </span>
            <div className="flex gap-2">
              <button 
                className="flex items-center space-x-1 p-2 bg-primary/80 text-white rounded-full text-sm hover:bg-primary transition-colors backdrop-blur-sm hover:shadow-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} />
              </button>
              <button 
                className="flex items-center space-x-1 px-4 py-2 bg-accent/90 text-white rounded-full text-sm hover:bg-accent transition-colors backdrop-blur-sm hover:shadow-lg"
                onClick={handleBuy}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;