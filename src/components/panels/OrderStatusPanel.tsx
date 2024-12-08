import React from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';

const OrderStatusPanel = () => {
  const orders = [
    {
      id: 'ORD001',
      product: 'Premium Laptop',
      date: '2024-03-10',
      status: 'Delivered',
      trackingId: 'TRK123456',
      deliveryDate: '2024-03-15',
    },
    {
      id: 'ORD002',
      product: 'Wireless Headphones',
      date: '2024-03-09',
      status: 'In Transit',
      trackingId: 'TRK123457',
      deliveryDate: '2024-03-12',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Transit':
        return <Truck className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(order.status)}
              <div>
                <h3 className="font-medium">{order.product}</h3>
                <p className="text-sm text-gray-500">Order ID: {order.id}</p>
              </div>
            </div>
            <span className={`text-sm font-medium ${
              order.status === 'Delivered' ? 'text-green-500' : 'text-blue-500'
            }`}>
              {order.status}
            </span>
          </div>
          
          <div className="text-sm space-y-1">
            <p className="text-gray-600">Tracking ID: {order.trackingId}</p>
            <p className="text-gray-600">Order Date: {order.date}</p>
            <p className="text-gray-600">Expected Delivery: {order.deliveryDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPanel;