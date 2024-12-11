import React, { useState } from 'react';
import { Wallet, History, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const WalletPanel = () => {
  const [balance, setBalance] = useState(500);
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isAddingFunds, setIsAddingFunds] = useState(false);

  const transactions = [
    { id: 1, type: 'Recharge', amount: 100, date: '2024-03-10' },
    { id: 2, type: 'Purchase', amount: -50, date: '2024-03-09' },
  ];

  const rechargeAmounts = [100, 500, 1000, 2000];
  
  const paymentMethods = [
    { id: 'credit-card', label: 'Credit/Debit Card' },
    { id: 'google-pay', label: 'Google Pay' },
    { id: 'apple-pay', label: 'Apple Pay' },
    { id: 'upi', label: 'UPI' },
    { id: 'usdc', label: 'USDC' },
    { id: 'sol', label: 'Solana (SOL)' },
    { id: 'eth', label: 'Ethereum (ETH)' },
  ];

  const handleAddFunds = () => {
    if (!selectedAmount || !paymentMethod) {
      toast.error('Please select an amount and payment method');
      return;
    }
    
    // Simulate payment processing
    toast.loading('Processing payment...');
    setTimeout(() => {
      setBalance(prev => prev + Number(selectedAmount));
      setIsAddingFunds(false);
      setSelectedAmount('');
      setPaymentMethod('');
      toast.success(`Successfully added $${selectedAmount} to wallet`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Wallet Balance</h3>
        </div>
        <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
      </div>

      <Dialog open={isAddingFunds} onOpenChange={setIsAddingFunds}>
        <DialogTrigger asChild>
          <Button 
            className="w-full gap-2 bg-primary hover:bg-primary/90"
            onClick={() => setIsAddingFunds(true)}
          >
            <Plus className="w-4 h-4" />
            Add Funds
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Funds to Wallet</DialogTitle>
            <DialogDescription>
              Choose an amount and payment method to add funds to your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
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
                onValueChange={setPaymentMethod}
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

            <Button
              onClick={handleAddFunds}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Add Funds
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
    </div>
  );
};

export default WalletPanel;