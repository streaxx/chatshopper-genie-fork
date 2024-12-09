import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletBalanceProps {
  balance: number;
  onClick: () => void;
}

const WalletBalance = ({ balance, onClick }: WalletBalanceProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-white/50 hover:bg-white/90 transition-colors"
    >
      <Wallet className="w-4 h-4" />
      <span className="font-medium">${balance.toFixed(2)}</span>
    </button>
  );
};

export default WalletBalance;