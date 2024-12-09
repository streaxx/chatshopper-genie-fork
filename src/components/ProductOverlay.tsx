import React from 'react';

export interface ProductOverlayProps {
  product: any;
  onClose: () => void;
  onBuy: () => void;
}

const ProductOverlay: React.FC<ProductOverlayProps> = ({ product, onClose, onBuy }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        <p className="mt-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={onBuy}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          >
            Buy Now
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductOverlay;
