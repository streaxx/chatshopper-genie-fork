import React from 'react';
import { Clock } from 'lucide-react';

const HistoryPanel = () => {
  const history = [
    { id: 1, product: 'Premium Laptop', date: '2024-03-10', action: 'Viewed' },
    { id: 2, product: 'Wireless Headphones', date: '2024-03-09', action: 'Purchased' },
  ];

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <Clock className="w-5 h-5 text-gray-500" />
          <div>
            <h3 className="font-medium">{item.product}</h3>
            <p className="text-sm text-gray-500">{item.action} on {item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryPanel;