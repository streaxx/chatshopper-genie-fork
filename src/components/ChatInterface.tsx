import React, { useState } from "react";
import axios from "axios";
import {
  Send,
  Mic,
  History,
  Bell,
  Heart,
  HelpCircle,
  User,
  Receipt,
  Menu,
  X,
  Settings,
  Package,
} from "lucide-react";
import ProductList from "./ProductList";
import ProductOverlay from "./ProductOverlay";
import { toast } from "sonner";
import SidePanel from "./SidePanel";
import HistoryPanel from "./panels/HistoryPanel";
import NotificationsPanel from "./panels/NotificationsPanel";
import WishlistPanel from "./panels/WishlistPanel";
import HelpPanel from "./panels/HelpPanel";
import AccountPanel from "./panels/AccountPanel";
import OrderStatusPanel from "./panels/OrderStatusPanel";
import OrderProcessing from "./OrderProcessing";
import ChatMessage from "./ChatMessage";
import WalletBalance from "./WalletBalance";
import WalletPanel from "./panels/WalletPanel";
import AddressSelector from "./AddressSelector";
import { useApp } from "@/contexts/AppContext";
import Exa from "exa-js";

const sampleProducts = [
  {
    id: 1,
    name: "Premium Laptop",
    price: 999.99,
    type: "sample",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "High-performance laptop with the latest tech specs.",
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 1299.99,
    type: "sample",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Professional-grade laptop for creative work.",
  },
];

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  panel: React.ReactNode;
  position?: "top" | "bottom";
}

const endpoint = import.meta.env.VITE_PUBLIC_ENDPOINT;

const ChatInterface = () => {
  const { walletBalance, updateWalletBalance, addTransaction, addOrder } =
    useApp();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanelIndex, setActivePanelIndex] = useState<number | null>(null);
  const [processingOrder, setProcessingOrder] = useState<any>(null);
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  const [messages, setMessages] = useState<
    Array<{
      role: "user" | "assistant";
      content: string;
      id: string;
      ui?: React.ReactNode;
    }>
  >([
    {
      role: "assistant",
      content:
        "Welcome! I'm your shopping assistant. What are you looking for today?",
      id: "welcome",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [menuItems] = useState<MenuItem[]>([
    {
      icon: <History className="w-5 h-5" />,
      label: "History",
      panel: <HistoryPanel />,
      position: "top",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
      panel: <NotificationsPanel />,
      position: "top",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Wishlist",
      panel: <WishlistPanel />,
      position: "top",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      label: "Help",
      panel: <HelpPanel />,
      position: "top",
    },
    {
      icon: <Package className="w-5 h-5" />,
      label: "Order Status",
      panel: <OrderStatusPanel />,
      position: "top",
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "Account",
      panel: <AccountPanel onWalletClick={() => handleWalletClick()} />,
      position: "bottom",
    },
  ]);

  const appendMessage = async (message: {
    role: "user" | "assistant";
    content: string;
    id: string;
    ui?: React.ReactNode;
  }) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const transformExaResults = (exaResults: any[]) => {
    return exaResults.map((result, index) => ({
      id: index + sampleProducts.length + 1,
      name: result.title,
      type: "exa",
      image: result.image,
      url: result.url,
    }));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      role: "user" as const,
      content: input,
      id: Date.now().toString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Start loading state
    setIsLoading(true);

    try {
      const result = await axios.post(
        endpoint,
        {
          messages: [
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            userMessage,
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const responseText = result?.data.response;

      if (/\b(buy|get|purchase|Buy|Get|Purchase)\b/i.test(responseText)) {
        const response = await fetch(import.meta.env.VITE_PUBLIC_PROXY_URL+'/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `product pages of with images ${responseText}`,
            text: true,
            numResults: 4,
          }),
        })

        const result = await response.json();
        //@ts-ignore

        const exaProducts = transformExaResults(result?.results);
        const combinedProducts = [...sampleProducts, ...exaProducts];
        toast.success(
          "This product is not available yet, but here are some products you might like!",
        );

        console.log(sampleProducts);
        setMessages((prev: any) => [
          ...prev,
          {
            role: "assistant" as const,
            content: (
              <ProductList
                //@ts-ignore
                products={combinedProducts}
                onSelectProduct={setSelectedProduct}
                onBuyProduct={handleBuy}
              />
            ),
            id: (Date.now() + 1).toString(),
          },
        ]);
      } else {
        console.log(responseText); // Log the response for debugging
        const assistantMessage = {
          role: "assistant" as const,
          content: responseText,
          id: Date.now().toString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again later.");
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleBuy = async (product: any) => {
    setProcessingOrder(product);

    if (walletBalance <= 0) {
      toast.error("You don't have enough funds in your wallet");
      return;
    }
    // Add to orders
    addOrder({
      product: product.name,
      status: "arriving",
      trackingId: `TRK${Math.random().toString(36).substr(2, 9)}`,
      amount: product.price,
      deliveryDate: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      trackingStatus: [
        { date: new Date().toISOString(), status: "Order Placed" },
      ],
    });

    // Handle transaction and wallet update
    const transactionAmount = -product.price;
    addTransaction({
      type: "expense",
      amount: transactionAmount,
      description: `Purchase: ${product.name}`,
    });

    updateWalletBalance(transactionAmount);

    await appendMessage({
      role: "assistant",
      content: "",
      id: Date.now().toString(),
      ui: (
        <OrderProcessing
          product={product}
          onComplete={() => {
            setProcessingOrder(null);
            toast.success("Order completed successfully!");
          }}
        />
      ),
    });
  };

  const handleWalletClick = () => {
    setActivePanelIndex(menuItems.length);
    setIsMenuOpen(false);
  };

  const handleAddAddress = () => {
    const accountIndex = menuItems.findIndex(
      (item) => item.label === "Account",
    );
    setActivePanelIndex(accountIndex);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50/80 via-white/40 to-blue-50/80">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <WalletBalance balance={walletBalance} onClick={handleWalletClick} />
          <AddressSelector onAddAddress={handleAddAddress} />
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Menu */}
      {isMenuOpen && (
        <div className="fixed top-20 right-4 z-50 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-2 animate-fade-in">
          <div className="flex flex-col space-y-1">
            <div className="space-y-1">
              {menuItems
                .filter((item) => item.position !== "bottom")
                .map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActivePanelIndex(index);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    {item.icon}
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </button>
                ))}
            </div>
            <div className="border-t border-gray-200 my-2" />
            {menuItems
              .filter((item) => item.position === "bottom")
              .map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const realIndex = menuItems.findIndex(
                      (menuItem) => menuItem.label === item.label,
                    );
                    setActivePanelIndex(realIndex);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                >
                  {item.icon}
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
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
          title={
            activePanelIndex < menuItems.length
              ? menuItems[activePanelIndex].label
              : "Wallet"
          }
          onBack={() => {
            if (activePanelIndex === menuItems.length) {
              const accountIndex = menuItems.findIndex(
                (item) => item.label === "Account",
              );
              setActivePanelIndex(accountIndex);
            } else {
              setActivePanelIndex(null);
              setIsMenuOpen(true);
            }
          }}
        >
          {activePanelIndex < menuItems.length ? (
            menuItems[activePanelIndex].panel
          ) : (
            <WalletPanel />
          )}
        </SidePanel>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent via-white/10 to-white/20 backdrop-blur-sm">
        {messages.map((message) => (
          <ChatMessage key={message.id} isUser={message.role === "user"}>
            {message.ui || message.content}
          </ChatMessage>
        ))}
        {isLoading && (
          <ChatMessage isUser={false}>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </ChatMessage>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-white/20 bg-white/30 backdrop-blur-sm"
      >
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-primary hover:text-primary-dark transition-colors bg-white/50 rounded-full backdrop-blur-sm"
            aria-label="Voice input"
            onClick={() => toast.info("Voice input activated")}
            disabled={isLoading}
          >
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-full border border-white/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 bg-primary/80 text-white rounded-full hover:bg-primary transition-colors backdrop-blur-sm disabled:opacity-50"
            aria-label="Send message"
            disabled={isLoading}
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
