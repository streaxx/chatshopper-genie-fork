import React, { useState } from 'react';
import { Send, Mic, History, Bell, Heart, HelpCircle, User, Receipt, Package, Menu, X, Wallet } from 'lucide-react';
import ProductList from './ProductList';
import ProductOverlay from './ProductOverlay';
import { toast } from 'sonner';
import SidePanel from './SidePanel';
import HistoryPanel from './panels/HistoryPanel';
import NotificationsPanel from './panels/NotificationsPanel';
import WishlistPanel from './panels/WishlistPanel';
import HelpPanel from './panels/HelpPanel';
import AccountPanel from './panels/AccountPanel';
import OrderStatusPanel from './panels/OrderStatusPanel';
import OrderProcessing from './OrderProcessing';
import ChatMessage from './ChatMessage';
import WalletBalance from './WalletBalance';
import WalletPanel from './panels/WalletPanel';

const sampleProducts = [
  {
    id: 1,
    name: "Premium Laptop",
    price: 999.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "High-performance laptop with the latest tech specs. Features include a powerful processor, ample storage, and stunning display.",
    availability: 'in-stock' as const
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Premium noise-canceling headphones with exceptional sound quality and comfort.",
    availability: 'low-stock' as const
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 299.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Advanced fitness and health tracking with smart notifications and long battery life.",
    availability: 'out-of-stock' as const
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: 159.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    description: "True wireless earbuds with premium sound quality and active noise cancellation.",
    availability: 'in-stock' as const
  },
  {
    id: 5,
    name: "Digital Camera",
    price: 699.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    description: "Professional-grade digital camera with advanced features for stunning photography.",
    availability: 'in-stock' as const
  }
];

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  panel: React.ReactNode;
  position?: 'top' | 'bottom';
}

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanelIndex, setActivePanelIndex] = useState<number | null>(null);
  const [processingOrder, setProcessingOrder] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState(1000);
  const [messages, setMessages] = useState<Array<{ isUser: boolean; content: React.ReactNode; timestamp: number }>>([
    { isUser: false, content: "Welcome! I'm your shopping assistant. What are you looking for today?", timestamp: Date.now() }
  ]);

  const menuItems: MenuItem[] = [
    { icon: <History className="w-5 h-5" />, label: "History", panel: <HistoryPanel />, position: 'top' },
    { icon: <Bell className="w-5 h-5" />, label: "Notifications", panel: <NotificationsPanel />, position: 'top' },
    { icon: <Heart className="w-5 h-5" />, label: "Wishlist", panel: <WishlistPanel />, position: 'top' },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help", panel: <HelpPanel />, position: 'top' },
    { icon: <Package className="w-5 h-5" />, label: "Order Status", panel: <OrderStatusPanel />, position: 'top' },
    { icon: <User className="w-5 h-5" />, label: "Account", panel: <AccountPanel />, position: 'bottom' }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const timestamp = Date.now();
    setMessages(prev => [...prev, { isUser: true, content: message, timestamp }]);
    
    if (message.toLowerCase().includes('buy')) {
      toast.success('Here are some products you might like!');
      setMessages(prev => [
        ...prev,
        {
          isUser: false,
          content: (
            <ProductList
              products={sampleProducts}
              onSelectProduct={setSelectedProduct}
              onBuyProduct={handleBuy}
            />
          ),
          timestamp: timestamp + 1
        }
      ]);
    }
    
    setMessage('');
  };

  const handleBuy = (product: any) => {
    setProcessingOrder(product);
    const timestamp = Date.now();
    setMessages(prev => [...prev, {
      isUser: false,
      content: (
        <OrderProcessing
          product={product}
          onComplete={() => {
            setProcessingOrder(null);
            setWalletBalance(prev => prev - product.price);
            toast.success('Order completed successfully!');
          }}
        />
      ),
      timestamp
    }]);
  };

  // Sort messages by timestamp to ensure correct order
  const sortedMessages = [...messages].sort((a, b) => a.timestamp - b.timestamp);

  const handleWalletClick = () => {
    const walletPanelIndex = menuItems.findIndex(item => item.label === "Wallet");
    if (walletPanelIndex === -1) {
      // If wallet panel is not in menuItems, add it temporarily
      const walletPanel = {
        icon: <Wallet className="w-5 h-5" />,
        label: "Wallet",
        panel: <WalletPanel />,
        position: 'top' as const
      };
      menuItems.push(walletPanel);
      setActivePanelIndex(menuItems.length - 1);
    } else {
      // If wallet panel exists, just show it
      setActivePanelIndex(walletPanelIndex);
    }
    console.log('Wallet clicked, panel index:', menuItems.length - 1);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50/80 via-white/40 to-blue-50/80">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4">
        <WalletBalance
          balance={walletBalance}
          onClick={handleWalletClick}
        />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
        >
          {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed top-20 right-4 z-50 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-2 animate-fade-in">
          <div className="flex flex-col space-y-1">
            <div className="space-y-1">
              {menuItems.filter(item => item.position !== 'bottom').map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActivePanelIndex(index);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                >
                  {item.icon}
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            {menuItems.filter(item => item.position === 'bottom').map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setActivePanelIndex(menuItems.length - 1);
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
              >
                {item.icon}
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Side Panel */}
      {activePanelIndex !== null && (
        <SidePanel
          isOpen={activePanelIndex !== null}
          onClose={() => setActivePanelIndex(null)}
          title={menuItems[activePanelIndex].label}
          onBack={() => {
            setActivePanelIndex(null);
            setIsMenuOpen(true);
          }}
        >
          {menuItems[activePanelIndex].panel}
        </SidePanel>
      )}

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent via-white/10 to-white/20 backdrop-blur-sm">
        {sortedMessages.map((msg, index) => (
          <ChatMessage key={index} isUser={msg.isUser}>
            {msg.content}
          </ChatMessage>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-primary hover:text-primary-dark transition-colors bg-white/50 rounded-full backdrop-blur-sm"
            aria-label="Voice input"
            onClick={() => toast.info('Voice input activated')}
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
          onBuy={() => handleBuy(selectedProduct)}
        />
      )}
    </div>
  );
};

export default ChatInterface;
