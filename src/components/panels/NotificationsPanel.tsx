import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsPanel = () => {
  const notifications = [
    { id: 1, message: 'Your order has been shipped!', date: '2024-03-10', isRead: false },
    { id: 2, message: 'Price drop on your wishlist item', date: '2024-03-09', isRead: true },
  ];

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`flex items-start gap-4 p-4 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50'}`}
        >
          <Bell className="w-5 h-5 text-gray-500 mt-1" />
          <div>
            <p className="font-medium">{notification.message}</p>
            <p className="text-sm text-gray-500">{notification.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPanel;