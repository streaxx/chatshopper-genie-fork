import React from 'react';

interface RechargeAmountsProps {
  selectedAmount: string;
  setSelectedAmount: (amount: string) => void;
}

const RechargeAmounts = ({ selectedAmount, setSelectedAmount }: RechargeAmountsProps) => {
  const rechargeAmounts = [100, 500, 1000, 2000];

  return (
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
        <input
          type="number"
          placeholder="Or enter custom amount"
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
      </div>
    </div>
  );
};

export default RechargeAmounts;