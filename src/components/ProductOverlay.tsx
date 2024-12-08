import React from 'react';
import { X, ShoppingCart } from 'lucide-react';

interface ProductOverlayProps {
  product: {
    id: number;
    name: string;
  };
  onClose: () => void;
}

const ProductOverlay = ({ product, onClose }: ProductOverlayProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full md:w-[480px] bg-white animate-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">
              Experience premium performance with this powerful laptop, featuring the latest technology
              for seamless multitasking and creative work.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg">Price</span>
                <span className="text-2xl font-bold">$999.99</span>
              </div>
              <button className="w-full py-3 bg-accent text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-accent-hover transition-colors">
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverlay;