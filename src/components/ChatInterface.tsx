import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductOverlay from './ProductOverlay';
import { toast } from 'sonner';

const sampleProducts = [
  {
    id: 1,
    name: "Premium Laptop",
    price: 999.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "High-performance laptop with the latest tech"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Premium noise-canceling headphones"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 299.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Advanced fitness and health tracking"
  }
];

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending message:', message);
    
    // Check if message contains "buy" and show products
    if (message.toLowerCase().includes('buy')) {
      toast.success('Here are some products you might like!');
    }
    
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example AI Message */}
        <div className="flex items-start space-x-2 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/50 max-w-[80%]">
            <p className="text-foreground">Welcome! I'm your shopping assistant. What are you looking for today?</p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="flex overflow-x-auto space-x-4 p-2 pb-4 scrollbar-hide">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
              description={product.description}
              onSelect={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-primary hover:text-primary-dark transition-colors bg-white/50 rounded-full backdrop-blur-sm"
            aria-label="Voice input"
          >
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-full border border-white/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            className="p-2 bg-primary/80 text-white rounded-full hover:bg-primary transition-colors backdrop-blur-sm"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      {/* Product Overlay */}
      {selectedProduct && (
        <ProductOverlay
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ChatInterface;