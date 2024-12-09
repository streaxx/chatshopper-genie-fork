import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';

interface OrderProcessingProps {
  product: {
    name: string;
    price: number;
  };
  onComplete: () => void;
}

const OrderProcessing = ({ product, onComplete }: OrderProcessingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [walletBalance, setWalletBalance] = useState(1000); // Mock initial balance

  const steps = [
    "Agent is placing your order...",
    "Processing payment...",
    "Finalizing order...",
  ];

  useEffect(() => {
    const timers = steps.map((_, index) => {
      return setTimeout(() => {
        setCurrentStep(index + 1);
        if (index === steps.length - 1) {
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
      }, (index + 1) * 2000);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="space-y-4 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 animate-fade-in">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`flex items-center gap-3 transition-opacity duration-300 ${
            index > currentStep ? 'opacity-40' : 'opacity-100'
          }`}
        >
          {index < currentStep ? (
            <Check className="text-green-500" />
          ) : index === currentStep ? (
            <Loader2 className="animate-spin text-primary" />
          ) : (
            <div className="w-6 h-6" />
          )}
          <span>{step}</span>
        </div>
      ))}
      
      {currentStep >= steps.length && (
        <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
          <h3 className="font-semibold">Order Summary</h3>
          <p>Product: {product.name}</p>
          <p>Amount paid: ${product.price}</p>
          <p>Remaining balance: ${(walletBalance - product.price).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default OrderProcessing;