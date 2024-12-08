import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductOverlay from './ProductOverlay';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example AI Message */}
        <div className="flex items-start space-x-2 animate-fade-in">
          <div className="bg-chat-assistant p-4 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-foreground">Welcome! I'm your shopping assistant. What are you looking for today?</p>
          </div>
        </div>

        {/* Example Product Cards */}
        <div className="flex overflow-x-auto space-x-4 p-2">
          <ProductCard
            image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            name="Premium Laptop"
            price={999.99}
            rating={4.5}
            onSelect={() => setSelectedProduct({ id: 1, name: "Premium Laptop" })}
          />
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-primary hover:text-primary-dark transition-colors"
            aria-label="Voice input"
          >
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
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