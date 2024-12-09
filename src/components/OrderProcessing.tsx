import React, { useState, useEffect } from 'react';
import { Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface OrderProcessingProps {
  product: {
    name: string;
    price: number;
  };
  onComplete: () => void;
}

const OrderProcessing = ({ product, onComplete }: OrderProcessingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

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
            setIsComplete(true);
            onComplete();
          }, 1000);
        }
      }, (index + 1) * 2000);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/60 transition-colors">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          )}
          <span className="font-medium">
            {isComplete ? "Order Complete" : "Processing Order..."}
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="space-y-3 p-3 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center gap-2 text-sm transition-opacity duration-300 ${
                index > currentStep ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : index === currentStep ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <div className="w-4 h-4" />
              )}
              <span>{step}</span>
            </div>
          ))}
          
          {isComplete && (
            <div className="mt-3 pt-3 border-t border-white/20 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Product:</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount paid:</span>
                <span className="font-medium text-primary">${product.price.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OrderProcessing;