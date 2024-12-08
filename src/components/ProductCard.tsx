import React from 'react';
import { Heart, Star } from 'lucide-react';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  onSelect: () => void;
}

const ProductCard = ({ image, name, price, rating, onSelect }: ProductCardProps) => {
  return (
    <div 
      onClick={onSelect}
      className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <button 
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full hover:text-accent transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Added to wishlist');
          }}
        >
          <Heart size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <div className="flex items-center space-x-1 mb-2">
          <Star className="text-yellow-400" size={16} />
          <span className="text-sm text-gray-600">{rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${price}</span>
          <button 
            className="px-3 py-1 bg-accent text-white rounded-full text-sm hover:bg-accent-hover transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Added to cart');
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;