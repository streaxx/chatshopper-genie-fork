import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethod {
  id: string;
  label: string;
  type: 'card' | 'qr' | 'crypto';
}

interface PaymentMethodsProps {
  paymentMethod: string;
  onPaymentMethodSelect: (method: string) => void;
}

const PaymentMethods = ({ paymentMethod, onPaymentMethodSelect }: PaymentMethodsProps) => {
  const paymentMethods: PaymentMethod[] = [
    { id: 'credit-card', label: 'Credit/Debit Card', type: 'card' },
    { id: 'google-pay', label: 'Google Pay', type: 'qr' },
    { id: 'apple-pay', label: 'Apple Pay', type: 'qr' },
    { id: 'usdc', label: 'USDC', type: 'crypto' },
    { id: 'sol', label: 'Solana (SOL)', type: 'crypto' },
    { id: 'eth', label: 'Ethereum (ETH)', type: 'crypto' },
  ];

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Select Payment Method</label>
      <RadioGroup
        value={paymentMethod}
        onValueChange={onPaymentMethodSelect}
        className="grid gap-2"
      >
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
              paymentMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200'
            }`}
          >
            <RadioGroupItem value={method.id} id={method.id} />
            <label
              htmlFor={method.id}
              className="flex-grow cursor-pointer font-medium"
            >
              {method.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethods;