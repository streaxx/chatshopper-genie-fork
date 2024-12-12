import React, { useState } from 'react';
import { Wallet, History, Plus, CreditCard, QrCode, Copy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const WalletPanel = () => {
  const [balance, setBalance] = useState(500);
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isAddingFunds, setIsAddingFunds] = useState(false);

  const transactions = [
    { id: 1, type: 'Recharge', amount: 100, date: '2024-03-10' },
    { id: 2, type: 'Purchase', amount: -50, date: '2024-03-09' },
  ];

  const rechargeAmounts = [100, 500, 1000, 2000];
  
  const paymentMethods = [
    { id: 'credit-card', label: 'Credit/Debit Card', type: 'card' },
    { id: 'google-pay', label: 'Google Pay', type: 'qr' },
    { id: 'apple-pay', label: 'Apple Pay', type: 'qr' },
    { id: 'usdc', label: 'USDC', type: 'crypto' },
    { id: 'sol', label: 'Solana (SOL)', type: 'crypto' },
    { id: 'eth', label: 'Ethereum (ETH)', type: 'crypto' },
  ];

  const handleAddFunds = () => {
    if (!selectedAmount) {
      toast.error('Please select an amount');
      return;
    }
    setIsAddingFunds(true);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
    setShowPaymentDetails(true);
  };

  const handleBack = () => {
    if (showPaymentDetails) {
      setShowPaymentDetails(false);
    } else {
      setIsAddingFunds(false);
      setSelectedAmount('');
      setPaymentMethod('');
    }
  };

  const handleProcessPayment = () => {
    // Simulate payment processing
    toast.loading('Processing payment...');
    setTimeout(() => {
      setBalance(prev => prev + Number(selectedAmount));
      setIsAddingFunds(false);
      setSelectedAmount('');
      setPaymentMethod('');
      setShowPaymentDetails(false);
      toast.success(`Successfully added $${selectedAmount} to wallet`);
    }, 2000);
  };

  const renderPaymentDetails = () => {
    const selectedPaymentMethod = paymentMethods.find(m => m.id === paymentMethod);
    
    if (!selectedPaymentMethod) return null;

    switch (selectedPaymentMethod.type) {
      case 'card':
        return (
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
              onClick={handleProcessPayment}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Pay ${selectedAmount}
            </Button>
          </div>
        );

      case 'qr':
        return (
          <div className="space-y-4 text-center">
            <div className="bg-gray-100 p-8 rounded-lg mx-auto w-fit">
              <QrCode className="w-32 h-32 mx-auto text-gray-600" />
            </div>
            <p className="text-sm text-gray-600">
              Scan this QR code to complete payment with {selectedPaymentMethod.label}
            </p>
            <Button
              onClick={handleProcessPayment}
              className="w-full bg-primary hover:bg-primary/90"
            >
              I've completed the payment
            </Button>
          </div>
        );

      case 'crypto':
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
              Send {selectedAmount} {selectedPaymentMethod.label} to this address
            </p>
            <Button
              onClick={handleProcessPayment}
              className="w-full bg-primary hover:bg-primary/90"
            >
              I've sent the payment
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Display */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Wallet Balance</h3>
        </div>
        <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
      </div>

      {/* Add Funds Section */}
      {!isAddingFunds ? (
        <Button 
          className="w-full gap-2 bg-primary hover:bg-primary/90"
          onClick={handleAddFunds}
        >
          <Plus className="w-4 h-4" />
          Add Funds
        </Button>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h3 className="font-medium">Add Funds</h3>
          </div>

          {!showPaymentDetails ? (
            <>
              <div className="space-y-4">
                <label className="text-sm font-medium">Select Amount</label>
                <div className="grid grid-cols-2 gap-3">
                  {rechargeAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount.toString())}
                      className={`p-3 border rounded-lg font-medium transition-colors ${
                        selectedAmount === amount.toString()
                          ? 'bg-primary text-white border-primary'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Or enter custom amount"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Select Payment Method</label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={handlePaymentMethodSelect}
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
            </>
          ) : (
            renderPaymentDetails()
          )}
        </div>
      )}

      {/* Transactions History */}
      {!isAddingFunds && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-medium">
            <History className="w-5 h-5" />
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20"
              >
                <div>
                  <p className="font-medium">{tx.type}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <span className={`font-medium ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPanel;