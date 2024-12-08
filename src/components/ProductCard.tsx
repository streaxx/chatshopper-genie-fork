import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  onSelect: () => void;
}

const ProductCard = ({ image, name, price, rating, description, onSelect }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Added to cart!');
    console.log('Added to cart');
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Added to wishlist!');
    console.log('Added to wishlist');
  };

  return (
    <div 
      onClick={onSelect}
      className="flex-shrink-0 w-72 bg-white/30 backdrop-blur-md rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in overflow-hidden group"
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          className="absolute top-2 right-2 p-2 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white hover:text-accent transition-colors"
          onClick={handleAddToWishlist}
        >
          <Heart size={20} />
        </button>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        
        <div className="flex items-center space-x-1">
          <Star className="text-yellow-400" size={16} />
          <span className="text-sm text-gray-600">{rating}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="font-bold text-lg text-gray-800">${price.toFixed(2)}</span>
          <button 
            className="flex items-center space-x-1 px-3 py-1.5 bg-accent/80 text-white rounded-full text-sm hover:bg-accent transition-colors backdrop-blur-sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;