import React from 'react';
import { Heart } from 'lucide-react';

const WishlistPanel = () => {
  const wishlist = [
    { id: 1, name: 'Premium Laptop', price: '$999.99', inStock: true },
    { id: 2, name: 'Wireless Headphones', price: '$199.99', inStock: false },
  ];

  return (
    <div className="grid gap-4">
      {wishlist.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <Heart className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price}</p>
            </div>
          </div>
          <span className={`text-sm ${item.inStock ? 'text-green-500' : 'text-red-500'}`}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WishlistPanel;