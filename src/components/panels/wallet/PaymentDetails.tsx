import React from 'react';
import { QrCode, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

interface PaymentDetailsProps {
  selectedAmount: string;
  paymentMethod: string;
  onProcessPayment: () => void;
}

const PaymentDetails = ({ selectedAmount, paymentMethod, onProcessPayment }: PaymentDetailsProps) => {
  const renderCardForm = () => (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Card Number"
        className="w-full"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="MM/YY"
          className="w-full"
        />
        <Input
          type="text"
          placeholder="CVV"
          className="w-full"
        />
      </div>
      <Button
        onClick={onProcessPayment}
        className="w-full bg-primary hover:bg-primary/90"
      >
        Pay ${selectedAmount}
      </Button>
    </div>
  );

  const renderQRCode = () => (
    <div className="space-y-4 text-center">
      <div className="bg-gray-100 p-8 rounded-lg mx-auto w-fit">
        <QrCode className="w-32 h-32 mx-auto text-gray-600" />
      </div>
      <p className="text-sm text-gray-600">
        Scan this QR code to complete payment with {paymentMethod}
      </p>
      <Button
        onClick={onProcessPayment}
        className="w-full bg-primary hover:bg-primary/90"
      >
        I've completed the payment
      </Button>
    </div>
  );

  const renderCryptoPayment = () => {
    const dummyAddress = '0x1234...5678';
    return (
      <div className="space-y-4">
        <div className="bg-gray-100 p-8 rounded-lg mx-auto w-fit">
          <QrCode className="w-32 h-32 mx-auto text-gray-600" />
        </div>
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <code className="flex-1 text-sm">{dummyAddress}</code>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(dummyAddress);
              toast.success('Address copied to clipboard');
            }}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Send {selectedAmount} {paymentMethod} to this address
        </p>
        <Button
          onClick={onProcessPayment}
          className="w-full bg-primary hover:bg-primary/90"
        >
          I've sent the payment
        </Button>
      </div>
    );
  };

  const getPaymentMethodType = () => {
    if (paymentMethod === 'credit-card') return 'card';
    if (['google-pay', 'apple-pay'].includes(paymentMethod)) return 'qr';
    return 'crypto';
  };

  const renderPaymentDetails = () => {
    const type = getPaymentMethodType();
    switch (type) {
      case 'card':
        return renderCardForm();
      case 'qr':
        return renderQRCode();
      case 'crypto':
        return renderCryptoPayment();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderPaymentDetails()}
    </div>
  );
};

export default PaymentDetails;