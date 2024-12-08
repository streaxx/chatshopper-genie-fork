import React from 'react';
import { Wallet, CreditCard, History } from 'lucide-react';

const WalletPanel = () => {
  const [balance, setBalance] = React.useState(500);
  const transactions = [
    { id: 1, type: 'Recharge', amount: 100, date: '2024-03-10' },
    { id: 2, type: 'Purchase', amount: -50, date: '2024-03-09' },
  ];

  const rechargeAmounts = [100, 500, 1000, 2000];

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-6 h-6" />
          <h3 className="text-xl font-semibold">Wallet Balance</h3>
        </div>
        <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
      </div>

      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium">
          <CreditCard className="w-5 h-5" />
          Quick Recharge
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {rechargeAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setBalance(b => b + amount)}
              className="p-3 border rounded-lg hover:bg-gray-50 font-medium"
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium">
          <History className="w-5 h-5" />
          Recent Transactions
        </h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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