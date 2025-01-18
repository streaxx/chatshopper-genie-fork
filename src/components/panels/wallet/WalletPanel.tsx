import React, { useState } from 'react';
import { Wallet, History, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import RechargeAmounts from './RechargeAmounts';
import PaymentMethods from './PaymentMethods';
import PaymentDetails from './PaymentDetails';
import { useApp } from '@/contexts/AppContext';

const WalletPanel = () => {
  const { walletBalance, updateWalletBalance, addTransaction, transactions } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isAddingFunds, setIsAddingFunds] = useState(false);

  const handleAddFunds = () => {
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
    if (!selectedAmount) {
      toast.error('Please select an amount');
      return;
    }
    
    toast.loading('Processing payment...');
    setTimeout(() => {
      const amount = Number(selectedAmount);
      updateWalletBalance(amount);
      addTransaction({
        type: 'recharge',
        amount,
        description: `Wallet recharge via ${paymentMethod}`
      });
      
      setIsAddingFunds(false);
      setSelectedAmount('');
      setPaymentMethod('');
      setShowPaymentDetails(false);
      toast.success(`Successfully added $${amount} to wallet`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Wallet Balance</h3>
        </div>
        <p className="text-3xl font-bold">${walletBalance.toFixed(2)}</p>
      </div>

      {!isAddingFunds ? (
        <Button 
          className="w-full gap-2 bg-primary hover:bg-primary/90"
          onClick={handleAddFunds}
        >
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
            <div className="space-y-6">
              <RechargeAmounts
                selectedAmount={selectedAmount}
                setSelectedAmount={setSelectedAmount}
              />
              {selectedAmount && (
                <PaymentMethods
                  paymentMethod={paymentMethod}
                  onPaymentMethodSelect={handlePaymentMethodSelect}
                />
              )}
            </div>
          ) : (
            <PaymentDetails
              selectedAmount={selectedAmount}
              paymentMethod={paymentMethod}
              onProcessPayment={handleProcessPayment}
            />
          )}
        </div>
      )}

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
                <p className="font-medium">{tx.type === 'recharge' ? 'Recharge' : 'Purchase'}</p>
                <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
              </div>
              <span className={`font-medium ${tx.type === 'recharge' ? 'text-green-500' : 'text-red-500'}`}>
                {tx.type === 'recharge' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPanel;