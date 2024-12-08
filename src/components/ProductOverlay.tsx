import React from 'react';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductOverlayProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  };
  onClose: () => void;
}

const ProductOverlay = ({ product, onClose }: ProductOverlayProps) => {
  const handleBuy = () => {
    toast.success('Processing your purchase!');
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
      <div className="absolute right-0 top-0 h-full w-full md:w-[480px] bg-white/80 backdrop-blur-md animate-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100/50 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <button 
                className="absolute top-2 right-2 p-2 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white hover:text-accent transition-colors"
                onClick={() => toast.success('Added to wishlist!')}
              >
                <Heart size={20} />
              </button>
            </div>
            
            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              
              <div className="space-y-4 bg-white/50 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-600">Price</span>
                  <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => toast.success('Added to cart!')}
                    className="flex-1 py-3 bg-primary/80 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-primary transition-colors backdrop-blur-sm"
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button 
                    onClick={handleBuy}
                    className="flex-1 py-3 bg-accent/80 text-white rounded-lg hover:bg-accent transition-colors backdrop-blur-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverlay;